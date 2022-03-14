const express = require('express');

const router = express.Router();
require('dotenv').config();

// @route   GET api/v1/test
// @desc    API test response endpoint.
// @access  Public
router.get('/', async (req, res) => {
  try {
    res.json({ message: "API test complete." });
  } catch(err) {
    res.status(500).send(err);
  }
});

module.exports = router;