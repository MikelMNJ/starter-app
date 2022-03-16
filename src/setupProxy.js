const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

module.exports = app => {
  const basePath = "/.netlify/functions/server";
  const options = { target: 'http://localhost:9000' };

  app.use(basePath, createProxyMiddleware(options));
};