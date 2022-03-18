const express = require('express');
const router = express.Router();
const {
  getSample,
  postSample,
  putSample,
  deleteSample
} = require('../controllers/sampleController');

router.route('/').get(getSample).post(postSample);
router.route('/:id').put(putSample).delete(deleteSample);

module.exports = router;