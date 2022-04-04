const express = require('express');
const router = express.Router();
const limiter = require('../middleware/limitMiddleware');
const auth = require('../middleware/authMiddleware');

const {
  checkTokenPayload,
  checkToken,
  checkCreateUserPayload,
  createUser,
  checkUpdateUserPayload,
  updateUser,
  checkDeleteUserPayload,
  deleteUser,
} = require('../controllers/userController');

router.route('/me')
  .post(limiter(), checkTokenPayload, checkToken);

router.route('/')
  .post(limiter(), checkCreateUserPayload, createUser)
  .put(limiter(), auth, checkUpdateUserPayload, updateUser)
  .delete(limiter(), auth, checkDeleteUserPayload, deleteUser);

module.exports = router;