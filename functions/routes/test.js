const express = require('express');

const router = express.Router();
require('dotenv').config();

// @route   GET api/v1/test
// @desc    API test response endpoint.
// @access  Public
router.get('/', async (req, res) => {
  try {
    res.json({
      message: "API response received.",
      type: "success"
    });
  } catch(err) {
    res.status(500).send('Server error.');
  }
});

module.exports = router;