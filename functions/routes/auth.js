const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const moment = require('moment');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

require('dotenv').config();
const { REACT_APP_JWT_SECRET: jwtSecret } = process.env;

const twoHours = 7200;
const aMonth = 2592000;

// @route   GET api/v1/auth
// @desc    Authenticate provided user credentials
// @access  Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch(err) {
    res.status(500).send('Server error.');
  }
});

// @route   POST api/v1/auth
// @desc    Authenticate user and get token
// @access  Public
router.post('/', [
  check('email')
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Invalid email.'),
  check('password')
    .notEmpty().withMessage('Password is required.'),
  check('trustedDevice', 'Tusted device payload type must be boolean.')
    .optional().not().isString().isBoolean(),
], async (req, res) => {
  const { email, password, trustedDevice } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        errors: [{ msg: 'Unauthorized: Invalid credentials.' }]
      });
    };

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        errors: [{ msg: 'Unauthorized: Invalid credentials.' }]
      });
    };

    user.lastSession = moment.utc();
    errors.isEmpty() && await user.save();

    const payload = {
      user: { id: user.id }
    };

    // 2592000 = 30 Days, 3600 = 1 Hour.
    jwt.sign(payload, jwtSecret, { expiresIn: trustedDevice ? aMonth : twoHours }, (err, token) => {
      if (err) throw err;
      const decoded = jwt.verify(token, jwtSecret);

      res.json({
        token,
        dateCreated: user.dateCreated,
        lastSession: user.lastSession,
        sessionEnd: decoded.exp,
        user: email,
        accountLevel: user.accountLevel
      });
    });
  } catch(error) {
    console.log(error);
    res.status(500).send('Server error.');
  };
});

module.exports = router;