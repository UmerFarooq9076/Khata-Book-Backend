const express = require('express');
const route = express.Router();
const bcrypt = require("bcrypt");
const signupInfo = require('../../models/khata-app/signupInfo');
const jwt = require('jsonwebtoken');

route.post('/add-role', (req,res,next)=>{
    bcrypt.hash(req.body.password, 10, (err,hash)=>{
        if(err){
            return res.status(404).json({error: err});
        } else {
            const Info = new SignUpInfo({
                name: req.body.name,
                email: req.body.email,
                password: hash,
                role: req.body.role
            });

            Info.save().then((result)=>{
                res.status(200).json({message: 'Register successfully.', record: result});
            }).catch((err)=>{
                res.status(404).json({error: err});
            });
        }
    });
});

route.post('/login', (req,res)=>{
    signupInfo.find({email: req.body.email}).exec().then((user)=>{
        if(!user.length){
            return res.status(401).json({error: "User not exist."});
        } else {
            bcrypt.compare(req.body.password, user[0].password, (err, result)=>{
                if(!result){
                    res.status(401).json({error: err});
                } else {
                    const token = jwt.sign({
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password
                    },"this is dummy token",{
                        expiresIn: "1h"
                    });

                    res.status(200).json({
                        name: user[0].name,
                        email: user[0].email,
                        password: user[0].password,
                        token: token
                    });
                };
            });
        };
    }).catch((err)=>{
        res.status(401).json({error: err});
    });
});

module.exports = route;