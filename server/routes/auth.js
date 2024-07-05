import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { jwtSecret } from '../config/config.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
    try {
        const { username, password, role } = req.body;
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new user
        const newUser = new User({ username, password: hashedPassword, role });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login route
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        // Find user in the database
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Generate JWT token
        const token = jwt.sign({ userId: user._id, role: user.role }, config.jwtSecret, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Example route requiring admin role
router.get('/admin', authMiddleware, async (req, res) => {
    try {
        // Check if user role is admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        // Admin-only logic here
        res.status(200).json({ message: 'Admin route accessed' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
