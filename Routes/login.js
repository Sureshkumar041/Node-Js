const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const userdata = require('../Models/user')

router.get('/login',async(req,res)=>{
    // res.write("Register Data");
    var dataBase = await userdata.find();
    res.json(dataBase);
    // console.log(userdata.find({Name : "Suresh"}));
});

module.exports = router;