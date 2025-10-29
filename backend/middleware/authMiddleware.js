// backend/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * Middleware to verify JWT token and attach user to request
 * Usage: Add to any route that requires authentication
 */
export const authenticate = async (req, res, next) => {
    try {
        // Extract token from Authorization header
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: 'No token provided. Please login.' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Find user by ID from token
        const user = await User.findById(decoded.id).select('-password');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Attach user to request object
        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired. Please login again.' });
        }
        res.status(401).json({ message: 'Authentication failed', error: error.message });
    }
};

/**
 * Middleware to check if authenticated user is a club type
 * Must be used after authenticate middleware
 */
export const isClubUser = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Authentication required' });
    }
    
    if (req.user.userType !== 'club') {
        return res.status(403).json({ 
            message: 'Access denied. This action is only available to club accounts.' 
        });
    }
    
    next();
};

/**
 * Middleware to check if authenticated user is a personal type
 * Must be used after authenticate middleware
 */
export const isPersonalUser = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Authentication required' });
    }
    
    if (req.user.userType !== 'personal') {
        return res.status(403).json({ 
            message: 'Access denied. This action is only available to personal accounts.' 
        });
    }
    
    next();
};

/**
 * Optional authentication - doesn't fail if no token
 * Useful for routes that work for both authenticated and guest users
 */
export const optionalAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.id).select('-password');
            if (user) {
                req.user = user;
            }
        }
        next();
    } catch (error) {
        // Silently fail and continue without user
        next();
    }
};