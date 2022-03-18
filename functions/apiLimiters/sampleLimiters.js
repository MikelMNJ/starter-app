const rateLimit = require('express-rate-limit');

const buildLimit = (max, windowMs, message) => (
  rateLimit({
    max,
    windowMs,
    handler: (req, res) => res.status(429).json({
      error: message || "Too many requests."
    })
  })
);

const getLimit = buildLimit(2, 10000);
const postLimit =buildLimit(2, 10000) ;
const putLimit = buildLimit(2, 10000);
const deleteLimit = buildLimit(2, 10000);

module.exports = {
  getLimit,
  postLimit,
  putLimit,
  deleteLimit,
};