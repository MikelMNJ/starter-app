const jwt = require('jsonwebtoken');
const { REACT_APP_JWT_SECRET: jwtSecret } = process.env;

module.exports = function(req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ errors: [{ msg: 'Unauthorized: No token found.' }] });
  };

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded.user;
    next();
  } catch(err) {
    res.status(401).json({ errors: [{ msg: 'Invalid token.' }] });
  };
};