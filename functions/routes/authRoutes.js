const express = require('express');
const router = express.Router();
const limiter = require('../middleware/limitMiddleware');
const auth = require('../middleware/authMiddleware');

const {
  getUserData,
  checkLoginPayload,
  login,
} = require('../controllers/authController');


router.route('/')
  .get(limiter(), auth, getUserData)
  .post(limiter(), checkLoginPayload, login);

module.exports = router;