
// Import the mongoose library for interacting with MongoDB
const mongoose = require('mongoose');

// Load environment variables from the .env file (such as MONGO_URI)
//This also ensures environment variables are available
require('dotenv').config();  

// Define an asynchronous function to connect to MongoDB
const connectDB = async () => {
    try {
        // Attempt to connect to MongoDB using the MONGO_URI from the .env file
        await mongoose.connect(process.env.MONGO_URI);

        //connection is successful message
        console.log('MongoDB Connected');
    } catch (err) {

        //connection error messsage
        console.error('MongoDB connection error:', err.message);  // Log error
        process.exit(1);
    }
};

// Export the connectDB function so it can be used in other parts of the application
module.exports = connectDB;


//Note when testing the post request /api/v1/user/signup
//Every time i would create a new user I cant use the same new user again otherwise I get a 400 bad request 


//If you want to test any sample users here are some untested ones that should give the 201 create

/*{
    "username": "merlinbrow",
    "email": "georgebrown@example.com",
    "password": "password123"
  }

  {
  "username": "james bond",
  "email": "georgebrown@example.com",
  "password": "password123"
}
*/