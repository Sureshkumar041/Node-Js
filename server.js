const express = require('express');
const mongoose = require('mongoose');
const bp = require('body-parser');
const app = express();

const db = "mongodb://localhost:27017/Registration_Data";

// API
const registerData = require('./Routes/register');
const loginData = require('./Routes/login')

// Body-Parser
app.use(bp.json());

// Middleware 
app.use('/',registerData);
app.use('/',loginData);

// Database connection
mongoose.connect(db, (error, database) => {
    try {
        if (error) throw new Error("Database enable to connect...!");
        console.log("Database connected successfully...");
    } catch (error) {
        console.log(error.message);
    }
});

// Server Response
app.get('/', (req, res) => {
    res.write("Server running successfully...");
    // res.redirect('/register');
    res.end();
});

// Local host Port
const port = 3000;
app.listen(port, () => console.log("Server running in port ", port));