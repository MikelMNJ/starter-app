const express = require('express');
const router = express.Router();
const limiter = require('../middleware/limitMiddleware');

const {
  getSample,
  postSample,
  putSample,
  deleteSample
} = require('../controllers/sampleController');

// Caching
const apicache = require('apicache');
let cache = apicache.middleware;
const defaultCache = '2 minutes';

// Routes
router.route('/')
  .get(limiter(), cache(defaultCache), getSample)
  .post(limiter(), cache(defaultCache), postSample);

router.route('/:id')
  .put(limiter(), cache(defaultCache), putSample)
  .delete(limiter(), cache(defaultCache), deleteSample);

module.exports = router;