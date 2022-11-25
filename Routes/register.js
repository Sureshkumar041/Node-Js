const { default: validation } = require('ajv/dist/vocabularies/validation');
const express = require('express');
// const { check, validationResult } = require('express-validator');
const {signupData} = require('../Controllers/registerchk');
const router = express.Router();

// Schema
const userdata = require('../Models/user');

// https://localhost:3000/register
router.get('/register', (req, res,next) => {
    res.end("GET Method")
    console.log("Get method");
});

// https://localhost:3000/post
router.post('/post',signupData, (req, res,next) => {
    console.log("Came...!");

    // var name = req.body.name;
    // var username = req.body.username;
    // var email = req.body.email;
    // var phno = req.body.phno;
    // var password = req.body.password;

    // var userInput = new userdata({
    //     "name": name,
    //     "username": username,
    //     "email": email,
    //     "phno": phno,
    //     "password": password
    // });

    // userInput.save((error) => {
    //     if (error) console.log(error.message);
    //     else console.log("Data inserted successfully ...!");
    // });

    // res.json(userInput);
    next();
});

module.exports = router;