import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/config.js';

function authMiddleware(req, res, next) {
    // Get token from headers
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Authorization token missing' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, config.jwtSecret);
        req.user = decoded; // Add user information to the request object
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

export default authMiddleware;
