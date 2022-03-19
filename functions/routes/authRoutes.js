const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');

const {
  checkCredentials,
  checkLoginPayload,
  login,
} = require('../controllers/authController');


router.route('/')
  .get(auth, checkCredentials)
  .post(checkLoginPayload, login);

module.exports = router;