const express = require('express');
const router = express.Router();
const limiter = require('../middleware/limitMiddleware');

const {
  sendEmail,
} = require('../controllers/emailController');

// Email
router.route('/')
  .post(limiter(), sendEmail);

module.exports = router;