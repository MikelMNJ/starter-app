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

// Caching
const apicache = require('apicache');
let cache = apicache.middleware;
const defaultCache = '2 minutes';

// Starter routes
router.route('/')
  .get(limiter(), getSample)
  .post(limiter(), cache(defaultCache), postSample);


  router.route('/:id')
  .put(limiter(), cache(defaultCache), putSample)
  .delete(limiter(), cache(defaultCache), deleteSample);

// Test routes
router.route('/limitTest')
  .get(limiter(1, 5000, customMessage("Rate limit tested!"), "result"), getLimitTest);

module.exports = router;