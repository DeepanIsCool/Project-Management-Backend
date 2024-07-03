//app,.js
const express = require('express');
const mongoose = require('mongoose');
const connectDb = require('./config/db'); // Database connection
const studentsRoutes = require('./routes/studentsRoutes');




const app = express();
const PORT = 3000;

// Connect to MongoDB
connectDb();

// Middleware
app.use(express.json());

// Routes
// app.use('/studentsRoutes', studentsRoutes);
app.use('/studentsRoutes', require("./routes/authRoutes"));
app.get("/", (req, res) => {
    res.send("Welcome to the Project Management Backend");
  });
// Start server
app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});
