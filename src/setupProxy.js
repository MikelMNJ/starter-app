const { createProxyMiddleware } = require('http-proxy-middleware');
const { REACT_APP_API_BASE_PATH } = process.env;

module.exports = app => {
  const basePath = REACT_APP_API_BASE_PATH;
  const options = { target: 'http://localhost:9000' };
  app.use(basePath, createProxyMiddleware(options));
};