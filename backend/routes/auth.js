const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');

// Register User
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) throw Error('User already exists');

        const user = new User({ username, email, password });
        await user.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Login User
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) throw Error('User does not exist');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw Error('Invalid credentials');

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({
            token,
            user: { id: user._id, username: user.username, email: user.email }
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//HomePage
// router.get('/home', authenticate, async (req, res) => {
//     res.status(200).json({ message: "Welcome to the home page", user: req.user });
// });



module.exports = router;
