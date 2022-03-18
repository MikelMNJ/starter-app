const express = require('express');
const router = express.Router();
// const {
//   getLimit,
//   postLimit,
//   putLimit,
//   deleteLimit
// } = require('../apiLimiters/sampleLimiters');

const {
  getSample,
  postSample,
  putSample,
  deleteSample
} = require('../controllers/sampleController');

// Caching
const apicache = require('apicache');
let cache = apicache.middleware;
const cacheTime = '2 minutes';

// Routes
router.route('/')
  .get(cache(cacheTime), getSample)
  .post(cache(cacheTime), postSample);

router.route('/:id')
  .put(cache(cacheTime), putSample)
  .delete(cache(cacheTime), deleteSample);

module.exports = router;