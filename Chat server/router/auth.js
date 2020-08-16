const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const {validationResult} = require('express-validator');
const { authvalidate } = require('../middleware/authValidate');


const User = require('../models/User');

router.post('/signup',authvalidate('createUser'), async (req, res) => {

    const { username, email, password } = req.body;
    const errors = validationResult(req);
    const error = {}
    if(!errors.isEmpty()){
        errors.array().map(err => error[err.param] = err.msg);
        return res.status(400).json(error)
    }

    try {
        const user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exist' });

        const newUser = new User({
          username,
          email,
          password,
        });
        const salt =await bcrypt.genSalt(10);
        newUser.password =await bcrypt.hash(password, salt);

        await newUser.save();
        res.status(200).json({ msg: 'Success' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error')
    }
    
});

router.post('/signin',authvalidate('logingUser'), async (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);
    const error = {}
    if(!errors.isEmpty()){
        errors.array().map(err => error[err.param] = err.msg);
        return res.status(400).json(error)
    }
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Please Register' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Your password is not Match' });

            const payload = {
                user: {
                    _id: user._id,
                    username:user.username
                }
            }
            jwt.sign(
                payload,
                config.get('jwtSecret'),
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error')
    }

   
 })

module.exports = router;