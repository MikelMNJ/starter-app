const { rateLimit } = require('express-rate-limit');

const limiter = (max, windowMs, message, type) => rateLimit({
  max: max || 2,
  windowMs: windowMs || 5000,
  keyGenerator: (req, res) => req.ip,
  handler: (req, res, next) => {
    res.status(429).json({
      [type || "error"]: message || "Too many requests.",
    });
  }
});

module.exports = limiter;