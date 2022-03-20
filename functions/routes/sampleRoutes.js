const express = require('express');
const router = express.Router();
const limiter = require('../middleware/limitMiddleware');
const customMessage = message => ({ message, type: "success" });

const {
  getSample,
  getLimitTest,
  postSample,
  putSample,
  deleteSample
} = require('../controllers/sampleController');

// Starter routes
router.route('/')
  .get(limiter(), getSample)
  .post(limiter(), postSample);


  router.route('/:id')
  .put(limiter(), putSample)
  .delete(limiter(), deleteSample);

// Test routes
router.route('/limitTest')
  .get(limiter(2, 1000, customMessage("Rate limit tested!"), "result"), getLimitTest);

module.exports = router;