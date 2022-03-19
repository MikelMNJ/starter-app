const { check, validationResult } = require('express-validator');

require('dotenv').config();
const { REACT_APP_EMAIL_KEY: apiKey } = process.env;

// @access  Public
// @route   POST server/v1/email
// @desc    Handles email dispatch requests.
const checkEmailPayload = [
  check('email')
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Invalid email.'),
];

const sendEmail = async (req, res) => {
  const { email } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  try {
    if (!apiKey) {
      return res.status(400).json({
        error: 'Email service key not provided.'
      });
    }

    // Dispatch email.

    res.json({ result: "Email successfully sent." });
  } catch(error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  checkEmailPayload,
  sendEmail
};