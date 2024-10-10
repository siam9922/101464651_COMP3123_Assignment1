// Import mongoose to define the schema and bcrypt for password hashing
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the User schema using mongoose.Schema
const UserSchema = new mongoose.Schema({
    // Username of the user, required field
    username: { type: String, required: true },

    // Email of the user, required and must be unique
    email: { type: String, required: true, unique: true },

    // Password of the user, required field
    password: { type: String, required: true },

    // Timestamp when the user account was created, defaults to the current date
    created_at: { type: Date, default: Date.now },

    // Timestamp when the user account was last updated, defaults to the current date
    updated_at: { type: Date, default: Date.now }
});

// Pre-save hook to hash the user's password before saving it to the database
UserSchema.pre('save', async function (next) {
    // If the password field is not modified, move to the next middleware
    if (!this.isModified('password')) return next();

    // Generate a salt with 10 rounds (cost factor)
    const salt = await bcrypt.genSalt(10);

    // Hash the password with the salt
    this.password = await bcrypt.hash(this.password, salt);

    // Proceed to the next middleware
    next();
});

// Export the User model so it can be used in other files
module.exports = mongoose.model('User', UserSchema);
