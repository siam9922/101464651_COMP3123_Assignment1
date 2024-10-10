// Import the User model, bcryptjs for password hashing, and jsonwebtoken for token generation
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Signup function to register a new user
exports.signup = async (req, res) => {
    // Extract username, email, and password from the request body
    const { username, email, password } = req.body;

    try {
        // Check if a user already exists with the provided email
        let user = await User.findOne({ email });
        if (user) {
            // If user exists, send a 400 (Bad Request) response with an error message
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new User instance with the provided data
        user = new User({ username, email, password });

        // Save the new user to the database
        await user.save();

        // Send a 201 (Created) response with a success message and the user's ID
        res.status(201).json({ message: 'User created successfully', user_id: user._id });
    } catch (err) {
        // Log the error and send a 500 (Server Error) response if something goes wrong
        console.error('Error in signup:', err.message);
        res.status(500).send('Server error');
    }
};

// Login function to authenticate a user
exports.login = async (req, res) => {
    // Extract email and password from the request body
    const { email, password } = req.body;

    try {
        // Find the user by their email
        let user = await User.findOne({ email });

        // If the user does not exist, send a 400 (Bad Request) response with an error message
        if (!user) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        // If the password does not match, send a 400 (Bad Request) response with an error message
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        // Generate a JWT token with the user's ID and a secret from the environment variables
        const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h' // Token expires in 1 hour
        });

        // Send a success message with the generated token
        res.json({ message: 'Login successful', token });
    } catch (err) {
        // Log the error and send a 500 (Server Error) response if something goes wrong
        console.error('Error in login:', err.message);
        res.status(500).send('Server error');
    }
};
