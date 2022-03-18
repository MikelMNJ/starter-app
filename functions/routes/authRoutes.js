const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');

const {
  checkCredentials,
  checkLoginPayload,
  login,
} = require('../controllers/authController');


router.get('/', auth, checkCredentials);
router.post('/', checkLoginPayload, login);

module.exports = router;