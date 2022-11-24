const { resetErrorsCount } = require('ajv/dist/compile/errors');
const { check, validationResult } = require('express-validator');
const userdata = require('../Models/user');

const signupData = (req, res, next) => {

    console.log("Coming data: ", req.body);

    var name = req.body.name;
    var username = req.body.username;
    var email = req.body.email;
    var phno = req.body.phno;
    var password = req.body.password;

    // console.log(name);
    // console.log(username);
    // console.log(email);
    // console.log(phno);
    // console.log(password);

    var validate = [
        check('name')
            .isLength({ min: 3 }).withMessage("Name contains atleast 3 character"),
            // .isLength({ max: 25 }).withMessage("Name character less than 25 character"),
        check('username')
            // .isLength({ min: 3 }).withMessage("Name contains atleast 3 character")
            // .isLength({ max: 25 }).withMessage("Name character less than 25 character")
            .custom(value => {
                var occur = userdata.findOne({ username: value });
                if (occur) return "User name alreadt taken...!";
            }),
        check('email')
            // .isLength({ min: 7 }).withMessage("Email contains atleast 7 character")
            // .isLength({ max: 25 }).withMessage("Email character less than 30 character")
            .isEmail().withMessage("Invalid email"),
        check('phno')
            // .isLength({ min: 10 }).withMessage("Invalid phone number")
            .isLength({ max: 10 }).withMessage("Invalid phone number"),
        check('password')
            .isLength({ min: 7 }).withMessage("Password contains atleast 7 character")
            // .isLength({ max: 25 }).withMessage("Password character limit exceed,maximum 25 character")
            // .matches('[0-9]').withMessage('Password Must Contain a Number')
            // .matches('[A-Z]').withMessage('Password Must Contain a Uppercase Letter')
            // .matches('[a-z]').withMessage('Password Must Contain a Uppercase Letter')
    ];

    // console.log("Validate: ",validate);

    const errors = validationResult(validate);
    // if (!errors.isEmpty()) {
    //     return res.json({ errors: errors.array() });
    // } else {
    //     var userInput = new userdata({
    //         "name": name,
    //         "username": username,
    //         "email": email,
    //         "phno": phno,
    //         "password": password
    //     });

    //     userInput.save((error) => {
    //         if (error) console.log(error.message);
    //         else console.log("Data inserted successfully ...!");
    //     });
    // }

    console.log("Controller inside ...!");
    return next(errors);
}

module.exports = {signupData};





























// var userData = req.body;
// var name = req.body.name;
// var username = req.body.username;
// var email = req.body.email;
// var phno = req.body.phno;
// var password = req.body.password;
// console.log("Register data");

// var validate = [
//     check('name').isLength({ min: 3 }).withMessage("Name contains atleast 3 character").isLength({ max: 25 }).withMessage("Name should be maximum 25 character"),
//     check('userData.username')
// ];
// console.log("VALIDATE : ", validate);

// const error = validationResult(validate);
// if(!error) return res.json(error.message);
// else return res.json("Valid Name ...!");

// const error = validationResult(req);
// if (!error.isEmpty()) {
//     console.log(error);
//     return res.json(error);
// } else{
//     res.json("Valid Name ...!");
// }

// return res.send(console.log("User entered data: ", userData.email));
// res.send("Suresh");
// next();