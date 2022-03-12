const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = app => {
  const basePath = '/.netlify/functions/server';
  const options = { target: 'http://localhost:9000' };

  app.use(
    createProxyMiddleware(basePath, options)
  );
};