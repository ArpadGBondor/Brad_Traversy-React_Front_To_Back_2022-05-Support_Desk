const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');
const User = require('../models/userModel');

// @desc Register a new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please include all fields');
    }

    // Find if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists.');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc Login a user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
        res.status(400);
        throw new Error('Please include all fields');
    }

    const user = await User.findOne({ email });
    // Check if user exists and password matches
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid credentials.');
    }
});

const generateToken = (id) => {
    return jsonWebToken.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc Get current user
// @route GET /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
    const { _id, name, email } = req.user;
    res.status(200).json({ id: _id, name, email });
});

module.exports = {
    registerUser,
    loginUser,
    getMe,
};
