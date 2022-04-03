const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');

const {
  checkTokenPayload,
  checkToken,
} = require('../controllers/userController');


router.route('/me')
  .post(checkTokenPayload, checkToken);

module.exports = router;