const { check, validationResult } = require('express-validator');
const moment = require('moment');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

require('dotenv').config();
const { REACT_APP_JWT_SECRET: jwtSecret } = process.env;

const anHour = 3600;
const aMonth = 2592000;

// @route   GET server/v1/auth
// @desc    Authenticate provided user credentials
// @access  Private
const getUserData = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select('-password');
    res.json(user);
  } catch(error) {
    res.status(500).json({ error });
  }
};

// @route   POST server/v1/auth
// @desc    Authenticate user and get token
// @access  Public
const checkLoginPayload = [
  check('email')
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Invalid email.'),
  check('password')
    .notEmpty().withMessage('Password is required.'),
  check('trustedDevice', 'Tusted device payload type must be boolean.')
    .optional().not().isString().isBoolean(),
];

const login = async (req, res) => {
  const { email, password, trustedDevice } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    let user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        error: 'Unauthorized: Invalid credentials.'
      });
    };

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        error: 'Unauthorized: Invalid credentials.'
      });
    };

    user.updatedAt = moment.utc();
    errors.isEmpty() && await user.save();

    const payload = {
      user: { id: user.id }
    };

    // 2592000 = 30 Days, 3600 = 1 Hour.
    jwt.sign(payload, jwtSecret, { expiresIn: trustedDevice ? aMonth : anHour }, (err, token) => {
      if (err) throw err;
      const decoded = jwt.verify(token, jwtSecret);

      res.json({
        token,
        user: email.toLowerCase(),
        sessionEnd: decoded.exp,
      });
    });
  } catch(error) {
    res.status(500).send(error);
  };
};

module.exports = {
  getUserData,
  checkLoginPayload,
  login,
};