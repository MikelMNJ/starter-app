const { rateLimit } = require('express-rate-limit');

const limiter = (max, windowMs, message) => rateLimit({
  max: max || 2,
  windowMs: windowMs || 5000,
  keyGenerator: (req, res) => req.ip,
  handler: (req, res, next) => {
    const error = message || "Too many requests.";
    res.status(429).json({ error });
    next();
  }
});

module.exports = limiter;