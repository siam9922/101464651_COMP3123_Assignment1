// Load environment variables from .env file
require('dotenv').config();

// Import express to create the server
const express = require('express');

// Import the function to connect to MongoDB
const connectDB = require('./config/db');

// Import the route handlers for users and employees
const userRoutes = require('./routes/user');
const employeeRoutes = require('./routes/employee');

// Initialize the Express application
const app = express();

// Connect to the MongoDB database
connectDB();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Define routes for user-related API endpoints (e.g., signup, login)
app.use('/api/v1/user', userRoutes);

// Define routes for employee-related API endpoints (e.g., CRUD operations)
app.use('/api/v1/emp', employeeRoutes);

// Set the port from environment variables, or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server and listen on the specified port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Basic route to check if the server is running
app.get('/', (req, res) => {
  res.send('Server is running');
});
