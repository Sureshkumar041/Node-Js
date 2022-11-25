const { resetErrorsCount } = require('ajv/dist/compile/errors');
const { default: Validator } = require('fastest-validator');
const validator = require('fastest-validator');
const validates  = require('../Models/user');
const userdata = require('../Models/user');

const signupData = (req, res, next) => {

    console.log("Coming data: ", req.body);

    var name = req.body.name;
    var username = req.body.username;
    var email = req.body.email;
    var phno = req.body.phno;
    var password = req.body.password;

    var userInput = new userdata({
        "name": name,
        "username": username,
        "email": email,
        "phno": phno,
        "password": password
    });

    const schema = {
        name:{type:"string",min:3,max:25},
        username : {type:"string", min : 3, max:25},
        email : {type: "email"},
        phno : {type: "number", min:10},
        password : {type: "string", pattern : "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"}
    };

    const check = new validator();
    const validation = check.validate(userInput,schema);

    if(validation != true ) {
        return res.json({
            message : "Validation Failed",
            error : validation
        });
    }else{
        userInput.save((error) => {
            if (error) console.log(error.message);
            else console.log("Data inserted successfully ...!");
            // res.json(userInput);
        });
    }

    // console.log(name);
    // console.log(username);
    // console.log(email);
    // console.log(phno);
    // console.log(password);

    // var validate = [
    //     check('name',"Name should contains +3 character")
    //         .isLength({ min: 3 })
    //         .isLength({ max: 25 }),
    //     check('username',"User name should contain +3 character")
    //         .isLength({ min: 3 })
    //         .isLength({ max: 25 })
    //         .custom(value => {
    //             var occur = userdata.findOne({ username: value });
    //             if (occur) return "User name already taken...!";
    //         }),
    //     check('email',"Invalid email address")
    //         .isEmail()
    //         .normalizeEmail(),
    //     check('phno',"Invalid phone number")
    //         .isLength({ min: 10 })
    //         .isLength({ max: 10 }),
    //     check('password',"Password should contain 7+ character,it contains one lowercase,uppercase,number and symbol")
    //         .isLength({ min: 7 })
    //         .matches("/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/")
    // ];

    // console.log("Validate: ",validate);

    // const errors = validationResult(req);
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

        // userInput.save((error) => {
        //     if (error) console.log(error.message);
        //     else console.log("Data inserted successfully ...!");
        //     // res.json(userInput);
        // });
    // }

    console.log("Controller inside ...!");
    return next();
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