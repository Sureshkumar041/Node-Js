// const userdata = require('../Models/user');

const userdata = require("../Models/user");
const bcrypt = require('bcrypt');

const loginData = async (req, res, next) => {
    console.log("Login Here Controller");
    // await res.json(req.body);
    const userName = req.body.username;
    const passWord = req.body.password;

    const userDetails_1 = await userdata.findOne({ username: userName });
    const userDetails_2 = await userdata.findOne({ email: userName });

    // Send response
    callBack=(sts,msg)=>{
        console.log(msg);
        return res.status(sts).json({
            "Message" : msg
        });
    }

    const loginInput = async (userDetails) => {
        const chk_pswd = await bcrypt.compare(passWord, userDetails.password);
        
        if (chk_pswd == true) {
            callBack(200,"Login Successfully...!")
        }
        else {
            callBack(400,"Invalid Password")
        }
    }

    if (userDetails_1) {
        loginInput(userDetails_1);
        return;
    } else if (userDetails_2) {
        loginInput(userDetails_2);
        return;
    } else {
        callBack(400,"Invalid user name or email address")
    }
    next();
}

module.exports = loginData;