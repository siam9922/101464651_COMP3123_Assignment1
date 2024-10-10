// Import mongoose to define the schema
const mongoose = require('mongoose');

// Define the Employee schema using mongoose.Schema
const EmployeeSchema = new mongoose.Schema({
    // First name of the employee, required field
    first_name: { type: String, required: true },

    // Last name of the employee, required field
    last_name: { type: String, required: true },

    // Email of the employee, required and must be unique
    email: { type: String, required: true, unique: true },

    // Position of the employee in the company, required field
    position: { type: String, required: true },

    // Employee's salary, must be a number, required field
    salary: { type: Number, required: true },

    // Date when the employee joined the company, required field
    date_of_joining: { type: Date, required: true },

    // Department the employee belongs to, required field
    department: { type: String, required: true },

    // Timestamp when the employee record was created, defaults to the current date
    created_at: { type: Date, default: Date.now },

    // Timestamp when the employee record was last updated, defaults to the current date
    updated_at: { type: Date, default: Date.now }
});

// Export the Employee model so it can be used in other files
module.exports = mongoose.model('Employee', EmployeeSchema);
