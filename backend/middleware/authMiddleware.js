const asyncHandler = require('express-async-handler');
const jsonWebToken = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];
            // Verify token
            const decoded = jsonWebToken.verify(token, process.env.JWT_SECRET);
            // Get user from token
            req.user = await User.findById(decoded.id).select('-password');
            if (!req.user) {
                res.status(401);
                throw new Error('Not authirised');
            }

            next();
        } catch (error) {
            res.status(401);
            throw new Error('Not authirised');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authirised');
    }
});

module.exports = { protect };
