var express = require('express');
var jwt = require('jsonwebtoken');
var User = require("../models/User");
var bCrypt = require('bcryptjs');
var router = express.Router();

//Authentication endpoint
router.post('/login/:username/:password', function(req, res, next) {
let username = req.params.username
let password = req.params.password
User.findOne({username: username})
    .then((user)=>{
        if(!user){
            res.send("user was not found")
        }else{
            bCrypt.compare(password, user.password, (err, isMatch)=>{
                if(isMatch){
                    jwt.sign({
                        username: user.username,
                        userId: user._id
                    }, "//process.env.JWT_SECRET", {
                        expiresIn: "1h"
                    }, (err, token)=>{
                        console.log(token);
                        res.send(token);
                    })
                }else{
                    res.send("invalid password")
                }
            });
        }
    })
    .catch((err)=>{
        throw err
    });
});

module.exports = router;
