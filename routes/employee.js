const express = require('express');
const router = express.Router();
const { getEmployees, createEmployee, getEmployeeById, updateEmployee, deleteEmployee } = require('../controllers/employeeController');
const { check } = require('express-validator');

// Route to get all employees
router.get('/employees', getEmployees);

// Route to create a new employee
router.post('/employees', [
    check('first_name', 'First Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('salary', 'Salary must be a number').isNumeric()
], createEmployee);

// Route to get employee by ID
router.get('/employees/:eid', getEmployeeById);  // <-- Add this

// Route to update an employee by ID
router.put('/employees/:eid', updateEmployee);

// Route to delete an employee by ID
router.delete('/employees', deleteEmployee);

module.exports = router;
