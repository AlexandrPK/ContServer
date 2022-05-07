const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://ec2-3-123-32-242.eu-central-1.compute.amazonaws.com:8080',
      changeOrigin: true,
    })
  );
};