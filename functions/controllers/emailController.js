const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const sgMail = require('@sendgrid/mail');
const fifteenMinutes = 900;
const {
  REACT_APP_EMAIL_API_KEY: apiKey,
  REACT_APP_VERIFIED_SENDER_EMAIL: sendAddress,
  REACT_APP_BASE_URL: url,
  REACT_APP_JWT_SECRET: jwtSecret,
} = process.env;

sgMail.setApiKey(apiKey);

// @access  Public
// @route   POST server/v1/emails
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

    const msg = {
      to: email,
      from: sendAddress,
      subject: "Test email dispatched.",
      text: 'A test email has successfully been dispatched from the Starter App project.',
      html:
       `<strong>
          A test email has successfully been dispatched from the Starter App project.
        </strong>`,
    };

    // await sgMail.send(msg);

    res.json({ result: "Email successfully sent." });
  } catch(error) {
    res.status(500).json({ error });
  }
};

// @access  Public
// @route   POST server/v1/emails/pw-reset
// @desc    Password email dispatch requests.
const checkResetReqPayload = [
  check('email')
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Invalid email.'),
];

const sendResetReq = async (req, res) => {
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

    let user = await userModel.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(400).json({
        // Showing generic message if user does not exists.
        errors: [{ message: 'Unable to create reset token.' }]
      });
    };

    const payload = {
      user: { id: user.id }
    };

    jwt.sign(payload, jwtSecret, { expiresIn: fifteenMinutes }, async (err, token) => {
      if (err) throw err;
      const resetURL = `https://${url}/set-password?token=${token}`;
      const msg = {
        to: email,
        from: sendAddress,
        subject: "Password reset requested",
        text: `We've received a request to reset your password.
        If this was you, please follow the link to continue the reset process:

        ${resetURL}

        If you didn't make this request, please disregard this email.`,
        html:
         `<p>
            We've received a request to reset your password.
            If this was you, please follow the link to continue the reset process:
          </p>

          <a href="${resetURL}">
            ${resetURL}
          </a>

          <p>
            If you didn't make this request, please disregard this email.
          </p>`,
      };

      await sgMail.send(msg);

      res.json({
        message: "Request received. Check email to proceed."
      });
    });
  } catch(error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  checkEmailPayload,
  sendEmail,
  checkResetReqPayload,
  sendResetReq,
};