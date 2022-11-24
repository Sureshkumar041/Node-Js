const { default: validation } = require('ajv/dist/vocabularies/validation');
const express = require('express');
const { check, validationResult } = require('express-validator');
const {signupData} = require('../Controllers/registerchk');
const router = express.Router();

// Schema
const userdata = require('../Models/user');

https://localhost:3000/register
router.get('/register', (req, res,next) => {
    res.end("GET Method")
    console.log("Get method");
});

router.post('/post', signupData, (req, res) => {

    // var Validation =[];
    // validation = signupData.signupData();
    // console.log("Validation: ",validation);

    var name = req.body.name;
    var username = req.body.username;
    var email = req.body.email;
    var phno = req.body.phno;
    var password = req.body.password;

    console.log(errors.array());


    // res.json(userInput);
    next();
});

module.exports = router;