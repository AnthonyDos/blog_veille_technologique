const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const fs = require('fs'); 
const errorMessage = require('../config/errorMessage/errorMessage.js');
const { REGEX_PASSWORD } = require('../config/regex/regex.js');
const { ERROR_CODE } = require('../config/errorCode/errorCode.js');
const User = require('../models/User.js');
require('dotenv').config();

exports.singup = (req, res, next) => {
    
    const { gender, firstName, lastName, email, password, category } = req.body;
    if (!password.match(REGEX_PASSWORD)) {
        throw error = res.status(401).json(errorMessage.errorRegexPassword)
    }
 
    bcrypt.hash(password, 10)   
    .then( hash => {     
        const user = new User({
            gender: gender,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hash,
            image: req.file.filename,
            category: category,
        });
        user.save()
        .then(()=> res.status(201).json({ 
            token: jwt.sign(
                { userId: user.id },
                process.env.JWT_TOKEN,
                { expiresIn: '24h' }
            ),
            message: 'utilisateur créé!'
        }))
        .catch(error => {
            if (Object.values(error)[1] === ERROR_CODE) {
                return res.send({ error: error, message: errorMessage.errorUserAlReadyExist })
            }
            res.status(400);
            return res.send(Object.values(error.errors)[0].message)
        })
    })
    .catch(error => {
        res.status(500).json({ error: error, message: errorMessage.errorServer })
    })
}

exports.login = (req, res, next) => {
    const { email, password } = req.body;
    User.findOne({ email: email })
    .then(user => {
        if (!user) {
            return res.status(401).json({ error: errorMessage.errorUserNotExist });
        }
        bcrypt.compare(password, user.password)
        .then(valid => {
            if (!valid){
                return res.status(401).json({ error: errorMessage.errorPasswordIncorrect });
            }
            res.status(200).json({
                userId: user._id,
                token: jwt.sign (
                    { userId: user._id },
                    process.env.JWT_TOKEN,
                    { expiresIn: '24h' }
                )       
            })
        })
        .catch(error => res.status(500).json({ error: error, message:errorMessage.errorServer }))
    })
    .catch(error => res.status(500).json({ error : error, message:errorMessage.errorServer }));
};