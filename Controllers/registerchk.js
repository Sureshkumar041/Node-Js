
const validator = require('fastest-validator');
const bcrypt = require('bcrypt');
// const validates = require('../Models/user');
const userdata = require('../Models/user');

const signupData = async (req, res, next) => {

    console.log("Coming data: ", req.body);


    var name = req.body.name;
    var username = req.body.username;
    var email = req.body.email;
    var phno = req.body.phno;
    var password = req.body.password;
    var confirmPassword = req.body.confirmPassword;

    var userInput = new userdata({
        "name": name,
        "username": username,
        "email": email,
        "phno": phno,
        "password": password,
        "confirmPassword": confirmPassword
    });

    const limit = {
        name: { type: "string", min: 3, max: 25 },
        username: { type: "string", min: 3, max: 25 },
        email: { type: "email" },
        phno: { type: "number", minlenght: 10 },
        password: { type: "string", pattern: "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})" },
        confirmPassword: { type: "equal", field: "password" }
    };

    const check = new validator();
    const validation = check.validate(userInput, limit);

    // Check if user name and email already exists or not
    const userchk = await userdata.findOne({ username: username });
    const emailchk = await userdata.findOne({ email: email });

    // Send response
    callBack = (sts, msg) => {
        return res.status(sts).json({
            "Message": msg
        });
    }
    errorMessage=(validation)=>{
        return res.status(400).send(validation);
    }

    // Checking the user data
    if (userchk && emailchk) {
        callBack(400,"User name and Email address already exists");
        return;
    } else if (emailchk) {
        callBack(400,"Email address already exists");
        return;
    } else if (userchk) {
        callBack(400,"User name already exixts");
        return;
    } else {
        if (validation != true) {
            errorMessage(validation);
            return true;
        } else {
            const salt = await bcrypt.genSalt(1);
            userInput.password = await bcrypt.hash(userInput.password, salt);
            userInput.save((error) => {
                if (error){
                    console.log(error.message);
                    return;
                }
                else {
                    console.log("Data inserted successfully ...!");
                    callBack(200,"Registered Successfully...!");
                    return;
                }
                return;
            });
        }
    }
    console.log("Controller inside ...!");
    next();
};

module.exports = { signupData };








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
