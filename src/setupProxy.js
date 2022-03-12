const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = app => {
  const basePath = '/.netlify/functions/server';

  app.use(
    basePath,
    createProxyMiddleware({ target: 'http://localhost:9000' })
  );
};