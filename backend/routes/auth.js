const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const passport = require('passport');


// Register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Basic input validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to redirect to Steam
router.get('/steam', passport.authenticate('steam'));

//router.get('/steam/return',
  passport.authenticate('steam', { failureRedirect: '/' }),
  async (req, res) => {

    const user = req.user;
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.redirect(`http://localhost:3000/dashboard?token=${token}`);
  }
//);

router.get('/steam/return',
  passport.authenticate('steam', { failureRedirect: '/' }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id, username: req.user.username }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Return the token directly (no redirect)
    res.json({ message: 'Login successful', token, user: req.user });
  }
);

module.exports = router;