// Import express to create a router object for handling HTTP requests
const express = require('express');
const router = express.Router();

// Log a message when the userController is being loaded
console.log('Loading userController...');

// Import the signup and login controller functions from userController
const { signup, login } = require('../controllers/userController');

// Import express-validator to validate incoming requests
const { check } = require('express-validator');

// Route for user sign-up (POST /signup)
// This route requires validation for username, email, and password
router.post('/signup', [
    // Validate that username is provided and is not empty
    check('username', 'Username is required').not().isEmpty(),

    // Validate that email is in the correct format
    check('email', 'Please include a valid email').isEmail(),

    // Validate that the password is at least 6 characters long
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
], signup);  // Pass to signup controller if validation passes

// Route for user login (POST /login)
// This route requires validation for email and password
router.post('/login', [
    // Validate that a valid email is provided
    check('email', 'Please include a valid email').isEmail(),

    // Validate that the password exists in the request
    check('password', 'Password is required').exists()
], login);  // Pass to login controller if validation passes

// Export the router so that it can be used in other parts of the application
module.exports = router;
