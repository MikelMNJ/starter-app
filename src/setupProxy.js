const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

const { REACT_APP_API_V1 } = process.env;

module.exports = app => {
  const basePath = REACT_APP_API_V1;
  const options = { target: 'http://localhost:9000' };
  app.use(basePath, createProxyMiddleware(options));
};