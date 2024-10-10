
// Import the Employee model from the models folder
const Employee = require('../models/Employee');

// Import validation result to handle validation errors from express-validator
const { validationResult } = require('express-validator');

// Get all employees
const getEmployees = async (req, res) => {
    try {
 
        // Fetch all employee records from the Employee collection
        const employees = await Employee.find();
        res.json(employees);

        // Send the list of employees as a JSON response
    } catch (err) {

        //if an error occurs
        console.error('Error fetching employees:', err.message);
        res.status(500).send('Server error');
    }
};

// Get employee by ID
const getEmployeeById = async (req, res) => {
    try {
        // Fetch the employee by their unique ID (eid) from the request parameters

        // If employee is not found, return a 404 (Not Found) response
        const employee = await Employee.findById(req.params.eid);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        // Send the found employee data as a JSON response
        res.json(employee);
    } catch (err) {
        console.error('Error fetching employee by ID:', err.message);
        res.status(500).send('Server error');
    }
};

// Create a new employee
const createEmployee = async (req, res) => {

    // Validate incoming request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    // Destructure the employee fields from the request body
    const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body;

    // Create a new Employee instance with the provided data
    try {
        const newEmployee = new Employee({
            first_name,
            last_name,
            email,
            position,
            salary,
            date_of_joining,
            department
        });

        // Save the new employee to the database
        // Return a 201 (Created) response with the newly created employee's data
        const employee = await newEmployee.save();
        res.status(201).json({ message: 'Employee created successfully', employee });
    } catch (err) {
        console.error('Error creating employee:', err.message);
        res.status(500).send('Server error');
    }
};


// Function to update an employee by their ID
const updateEmployee = async (req, res) => {
    try {
        // Find the employee by ID and update their details with the request body
        const employee = await Employee.findByIdAndUpdate(req.params.eid, req.body, { new: true });

        // If employee is not found, return a 404 (Not Found) response
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        // Send a success message and the updated employee data as a response
        res.json({ message: 'Employee updated successfully', employee });
    } catch (err) {
        // Log the error and send a 500 (server error) response if something goes wrong
        console.error('Error updating employee:', err.message);
        res.status(500).send('Server error');
    }
};

// Function to delete an employee by their ID (from query parameters)
const deleteEmployee = async (req, res) => {
    try {
        // Find the employee by ID and delete them from the database
        const employee = await Employee.findByIdAndDelete(req.query.eid);

        // If employee is not found, return a 404 (Not Found) response
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        // Send a success message indicating the employee was deleted
        res.json({ message: 'Employee deleted successfully' });
    } catch (err) {
        // Log the error and send a 500 (server error) response if something goes wrong
        console.error('Error deleting employee:', err.message);
        res.status(500).send('Server error');
    }
};

// Export the functions so they can be used in other parts of the application
module.exports = {
    getEmployees,
    createEmployee,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
};