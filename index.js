// Importing the packages (express)
const express = require('express');
const connectDatabase = require('./database/database');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');

// Creating an express app
const app = express();

//  cors configuration
const corsOptions = {
  origin: true,
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Express Json Config
app.use(express.json());

// dotenv Configuration
dotenv.config();

// Connecting to database
connectDatabase();

// Defining the port
const PORT = process.env.PORT;

// Configuring Routes of User
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/todo', require('./routes/toDoRoutes'));

// http://localhost:5000/api/user
const server = http.createServer(app);

// Starting the server (always at the last)
server.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
