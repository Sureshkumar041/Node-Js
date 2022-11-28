const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phno: {
        type: Number,
        required: true
    },
    password: {
        type: String
    },
    confirmPassword: {
        type: String
    }
}, { versionKey: false, timestamps: true });

const userdata = mongoose.model("userdata", userSchema);

module.exports = userdata;