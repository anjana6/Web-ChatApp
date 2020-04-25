const express = require('express');
const router = express.Router();

const User = require('../models/User');

router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exist' });
});

module.exports = router;