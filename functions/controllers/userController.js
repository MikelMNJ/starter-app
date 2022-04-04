const { check, validationResult } = require('express-validator');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

require('dotenv').config();
const { REACT_APP_JWT_SECRET: jwtSecret } = process.env;


// @route   POST api/v1/users/me
// @desc    Validate existing token
// @access  Public
const checkTokenPayload = [
  check('token')
    .notEmpty().withMessage('Payload is required.')
    .isString().withMessage('Invalid payload type.'),
];

const checkToken = async (req, res) => {
  const { token } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const decoded = jwt.verify(token, jwtSecret);
    const id = decoded.user.id;

    let user = await userModel.findOne({ _id: id }).select('-password');

    if (!user) {
      return res.status(404).json({
        errors: [{ message: 'User not found.' }]
      });
    };

    res.json({
      token,
      user: user.email,
      sessionEnd: decoded.exp,
    });
  } catch(error) {
    console.log(error);
    res.status(440).json({
      errors: [{ message: 'Your session has expired.' }]
    });
  };
};

// @route   POST api/v1/users
// @desc    Register new user
// @access  Public
const anHour = 3600;
const aMonth = 2592000;
const checkCreateUserPayload = [
  check('email')
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Invalid email.'),
  check('password')
    .notEmpty().withMessage('Password is required.')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters.')
    .matches(/^(?=.*[0-9]).*$/).withMessage('Password must contain at least 1 number.')
    .matches(/^(?=.*[a-z]).*$/).withMessage('Password must contain at least 1 lowercase character.')
    .matches(/^(?=.*[A-Z]).*$/).withMessage('Password must contain at least 1 uppercase character.')
    .matches(/^(?=.*[@#$%^&+=!]).*$/).withMessage('Password must contain at least 1 special character.'),
  check('confirmPassword')
    .notEmpty().withMessage('Confirm password is required.')
    .custom((value, {req}) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match.');
      } else {
        return value;
      };
    }),
  check('trustedDevice', 'Tusted device payload type must be boolean.')
    .optional().not().isString().isBoolean(),
];

const createUser = async (req, res) => {
  const { email, password, trustedDevice } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    let user = await userModel.findOne({ email: email.toLowerCase() });

    if (user) {
      return res.status(400).json({
        // Showing generic message if user already exists.
        errors: [{ msg: 'Unable to create user.' }]
      });
    };

    const salt = await bcrypt.genSalt(12);
    user = new userModel({ email: email.toLowerCase(), password });
    user.password = await bcrypt.hash(password, salt);
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
        messsage: "Account created. Welcome!"
      });
    });
  } catch(error) {
    console.log(error)
    res.status(500).send('Server error.');
  };
};

module.exports = {
  checkTokenPayload,
  checkToken,
  checkCreateUserPayload,
  createUser,
};