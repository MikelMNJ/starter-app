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


// Routes
router.get('/', cache('2 minutes'), getSample);
router.get('/', cache('2 minutes'), postSample);
router.get('/:id', cache('2 minutes'), putSample);
router.get('/:id', cache('2 minutes'), deleteSample);

module.exports = router;