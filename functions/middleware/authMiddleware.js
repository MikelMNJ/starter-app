const jwt = require('jsonwebtoken');

require('dotenv').config();
const { REACT_APP_JWT_SECRET: jwtSecret } = process.env;

module.exports = function(req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token found.' });
  };

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded.user;
    next();
  } catch(err) {
    res.status(401).json({ error: 'Invalid token.' });
  };
};