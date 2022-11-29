const express = require('express');
const {signupData} = require('../Controllers/registerchk');
const router = express.Router();


// Schema
const userdata = require('../Models/user');


// https://localhost:3000/register
router.get('/register', (req, res,next) => {
    console.log("Get method");
    return res.end("GET Method");
});


// https://localhost:3000/post
router.post('/post',signupData, async (req, res,next) => {
    console.log("Came...!");
    next();
});

module.exports = router;



















// return await signupData;

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
    // res.status(200);