import User from '../models/User.js';
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

        const token = jwt.sign({ id: user._id }, process.env.jwt_SECRET, {expiresIn: "1d" });
        res.json ({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};