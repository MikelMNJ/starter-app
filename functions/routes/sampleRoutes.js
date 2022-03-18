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
router.get('/', cache(cacheTime), getSample);
router.post('/', cache(cacheTime), postSample);
router.put('/:id', cache(cacheTime), putSample);
router.delete('/:id', cache(cacheTime), deleteSample);

module.exports = router;