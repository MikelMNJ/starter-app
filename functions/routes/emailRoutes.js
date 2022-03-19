const express = require('express');
const router = express.Router();
const limiter = require('../middleware/limitMiddleware');

const {
  checkEmailPayload,
  sendEmail,
} = require('../controllers/emailController');

// Email
router.route('/')
  .post(limiter(1, 5000), checkEmailPayload, sendEmail);

module.exports = router;