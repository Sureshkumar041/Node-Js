const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        // minlength: [3,"Must be atleast at 3 character"],
        // maxlength: 25,
        // required: true
    },
    username: {
        type: String,
        // minlength: 7,
        // maxlength: 25,
        // required: true,
        // unique: true
    },
    email: {
        type: String,
        // required: true,
        // minlength: 7,
        // maxlength: 30,
        // unique: true
    },
    phno: {
        type: Number,
        // minlength: 10,
        // maxlength: 10,
        // required: true
    },
    password:{
        type: String,
        // minlength: 7,
        // maxlength: 25
    }
},{versionKey: false});

const userdata = mongoose.model("userdata",userSchema);

module.exports = userdata;