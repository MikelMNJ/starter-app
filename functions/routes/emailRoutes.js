const express = require('express');
const router = express.Router();
const limiter = require('../middleware/limitMiddleware');

const {
  checkEmailPayload,
  sendEmail,
  checkResetReqPayload,
  sendResetReq,
} = require('../controllers/emailController');

router.route('/')
  .post(limiter(1, 1000), checkEmailPayload, sendEmail);

router.route('/pw-reset')
  .post(limiter(), checkResetReqPayload, sendResetReq);

module.exports = router;