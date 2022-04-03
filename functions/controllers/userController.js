const { check, validationResult } = require('express-validator');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

require('dotenv').config();
const { REACT_APP_JWT_SECRET: jwtSecret } = process.env;

// @route   POST api/v1/user/me
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
      sessionEnd: decoded.exp,
      user: user.email,
    });
  } catch(error) {
    console.log(error);
    res.status(440).json({
      errors: [{ message: 'Your session has expired.' }]
    });
  };
};

module.exports = {
  checkTokenPayload,
  checkToken,
};