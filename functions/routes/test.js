const express = require('express');

const router = express.Router();
require('dotenv').config();

// @route   GET api/v1/test
// @desc    API test response endpoint.
// @access  Public
router.get('/', async (req, res) => {
  try {
    res.json({
      notification: {
        message: "API test successful.",
        icon: "fa-regular fa-file-code",
        type: "success",
      }
    });
  } catch(error) {
    res.json({
      errors: [ error ]
    });
  }
});

module.exports = router;