// backend/controllers/userController.js
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

/**
 * Register a new user (Club or Personal)
 * POST /api/users/register
 */
export const registerUser = async (req, res) => {
    try {
        const { name, email, password, userType, phone, clubType, location, bio } = req.body;
        
        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({ 
                message: "Name, email, and password are required" 
            });
        }

        // Validate userType
        if (!userType || !['club', 'personal'].includes(userType)) {
            return res.status(400).json({ 
                message: "Invalid user type. Must be 'club' or 'personal'" 
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ 
                message: "Email already registered. Please login or use a different email." 
            });
        }

        // Validate password length
        if (password.length < 6) {
            return res.status(400).json({ 
                message: "Password must be at least 6 characters long" 
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);
        
        // Prepare user data based on type
        const userData = {
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: hashedPassword,
            userType
        };

        // Add type-specific fields
        if (userType === 'club') {
            userData.phone = phone || '';
            userData.clubType = clubType || '';
        } else if (userType === 'personal') {
            userData.location = location || '';
            userData.bio = bio || '';
        }

        // Create user
        const user = await User.create(userData);

        // Update last login
        user.lastLogin = new Date();
        await user.save();

        // Create JWT token
        const token = jwt.sign(
            { 
                id: user._id, 
                userType: user.userType,
                email: user.email 
            }, 
            process.env.JWT_SECRET, 
            { expiresIn: "7d" }
        );

        // Prepare response (exclude password)
        const userResponse = user.getPublicProfile();

        res.status(201).json({ 
            message: "Account created successfully!",
            token,
            user: userResponse
        });

    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ 
            message: "Registration failed. Please try again.",
            error: err.message 
        });
    }
};

/**
 * Login user
 * POST /api/users/login
 */
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ 
                message: "Email and password are required" 
            });
        }

        // Find user by email
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(404).json({ 
                message: "No account found with this email" 
            });
        }

        // Check if account is active
        if (!user.isActive) {
            return res.status(403).json({ 
                message: "Your account has been deactivated. Please contact support." 
            });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ 
                message: "Invalid password" 
            });
        }

        // Update last login
        user.lastLogin = new Date();
        await user.save();

        // Create JWT token
        const token = jwt.sign(
            { 
                id: user._id, 
                userType: user.userType,
                email: user.email 
            }, 
            process.env.JWT_SECRET, 
            { expiresIn: "7d" }
        );

        // Prepare response
        const userResponse = user.getPublicProfile();

        res.json({ 
            message: "Login successful",
            token,
            user: userResponse
        });

    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ 
            message: "Login failed. Please try again.",
            error: err.message 
        });
    }
};

/**
 * Get current user profile
 * GET /api/users/profile
 * Requires authentication
 */
export const getProfile = async (req, res) => {
    try {
        // req.user is set by authenticate middleware
        const user = await User.findById(req.user.id).select('-password');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user.getPublicProfile());
    } catch (err) {
        console.error('Get profile error:', err);
        res.status(500).json({ 
            message: "Failed to fetch profile",
            error: err.message 
        });
    }
};

/**
 * Update user profile
 * PUT /api/users/profile
 * Requires authentication
 */
export const updateProfile = async (req, res) => {
    try {
        const { name, phone, bio, location, profilePicture } = req.body;
        
        const user = await User.findById(req.user.id);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update allowed fields
        if (name) user.name = name.trim();
        if (phone !== undefined) user.phone = phone;
        if (bio !== undefined) user.bio = bio;
        if (location !== undefined) user.location = location;
        if (profilePicture !== undefined) user.profilePicture = profilePicture;

        await user.save();

        res.json({ 
            message: "Profile updated successfully",
            user: user.getPublicProfile()
        });

    } catch (err) {
        console.error('Update profile error:', err);
        res.status(500).json({ 
            message: "Failed to update profile",
            error: err.message 
        });
    }
};

/**
 * Change password
 * PUT /api/users/change-password
 * Requires authentication
 */
export const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ 
                message: "Current password and new password are required" 
            });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ 
                message: "New password must be at least 6 characters long" 
            });
        }

        const user = await User.findById(req.user.id);
        
        // Verify current password
        const isValid = await bcrypt.compare(currentPassword, user.password);
        if (!isValid) {
            return res.status(401).json({ message: "Current password is incorrect" });
        }

        // Hash and save new password
        user.password = await bcrypt.hash(newPassword, 12);
        await user.save();

        res.json({ message: "Password changed successfully" });

    } catch (err) {
        console.error('Change password error:', err);
        res.status(500).json({ 
            message: "Failed to change password",
            error: err.message 
        });
    }
};

/**
 * Delete user account
 * DELETE /api/users/account
 * Requires authentication
 */
export const deleteAccount = async (req, res) => {
    try {
        const { password } = req.body;
        
        if (!password) {
            return res.status(400).json({ 
                message: "Password is required to delete account" 
            });
        }

        const user = await User.findById(req.user.id);
        
        // Verify password
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        // Instead of deleting, deactivate the account
        user.isActive = false;
        await user.save();

        res.json({ message: "Account deactivated successfully" });

    } catch (err) {
        console.error('Delete account error:', err);
        res.status(500).json({ 
            message: "Failed to delete account",
            error: err.message 
        });
    }
};























/* import User from '../models/User.js';
import bcrypt, { hash } from 'bcryptjs';
import { json } from 'express';
import jwt from "jsonwebtoken";


export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashed = await bcrypt.hash(password, 12);
        const user = await User.create({ name, email, password: hashed });
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const loginUser = async (req,res) => {
    try {
        const { email, password }= req.body;
        const user = await User.findOne({ email });
        if(!user) return res.status(404).json({ message: "User not found" });

        const match = await bcrypt.compare(password, user.password);
        if(!match) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {expiresIn: "1d" });
        res.json ({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}; */