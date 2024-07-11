//app,.js
const express = require('express');
const mongoose = require('mongoose');
const connectDb = require('./config/db'); // Database connection
const studentsRoutes = require('./Students/studentsRoutes');
const cors = require("cors");
require("dotenv").config();
const session = require("express-session");

const app = express();
const PORT = 3000;

// Connect to MongoDB
connectDb();

// Middleware
app.use(express.json());
const allowedOrigins = [
  "http://localhost:5173",
  
  
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));
// Routes
// app.use('/studentsRoutes', studentsRoutes);
app.use('/studentsRoutes', require("./Students/studentsRoutes"));
app.use('/facultyRoutes', require("./Faculty/facultyRoutes"));

app.get("/", (req, res) => {
    res.send("Welcome to the Project Management Backend");
  });
// Start server
app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});
