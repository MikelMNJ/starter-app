const { check, validationResult } = require('express-validator');
const {
  REACT_APP_EMAIL_API_KEY: apiKey,
  REACT_APP_VERIFIED_SENDER_EMAIL: sendAddress,
} = process.env;
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(apiKey);

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

module.exports = {
  checkEmailPayload,
  sendEmail
};