const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const loginData = require('../Controllers/loginchk');
const userdata = require('../Models/user');


// https://localhost:3000/login
router.post('/login',loginData,(req,res,next)=>{
    console.log("Login here");
    next();
});

module.exports = router;