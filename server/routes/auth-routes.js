/********************** IMPORTS **********************/
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const validateRegistration = require('../../validation/register');
const validateLogin = require('../../validation/login');
const User = require('../../models/user-model');

/********************** MAIN **********************/
const router = express.Router();
const secretOrKey = 'secret';

router.post('/auth/register', (req, res) => {
    const body = req.body;
    const { errors, isValid } = validateRegistration(body);

    if (!isValid) 
    {
        return res.status(400).json(errors);
    }

    if (!body) 
    {
        return res.status(400).json({
            success: false,
            error: 'Failed to create account'
        });
    }

    User.findOne({ email: body.email }, function(err, user) {
        if (user)
        {
            return res.status(400).json({ email: "Email already exists" });
        }
    });
    
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    });
    
    if (!user) 
    {
        return res.status(400).json({
            success: false,
            error: 'Unable to create account'
        });
    }

    user.save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: user._id,
                message: 'Account successfully created'
            });
        });
});

router.post('/auth/login', (req, res) => {
    const body = req.body;
    const { errors, isValid } = validateLogin(body);

    if (!isValid) 
    {
        return res.status(400).json(errors);
    }

    const email = body.email;
    const password = body.password;

    User.findOne({ email }).then(user => {
        if (!user) 
        {
            return res.status(404).json({ emailNotFound: 'Email not found' });
        }

        user.comparePassword(password, function(err, isMatch) {
            if (err) throw err;
            if (isMatch) 
            {
                const payload = {
                    id: user.id,
                    name: user.firstName
                };

                jwt.sign(payload, secretOrKey, { expiresIn: 31556926 },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: 'Bearer ' + token
                        });
                    });
            } 
            else 
            {
                return res.status(400).json({ passwordIncorrect: 'Password incorrect' });
            }
        });
    });
});

module.exports = router;