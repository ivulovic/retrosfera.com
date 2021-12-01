const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(createProxyMiddleware('/auth', { target: 'http://localhost:5001' }));
  app.use(createProxyMiddleware('/api', { target: 'http://localhost:5002' }));
  app.use(
    '/bitfinex',
    createProxyMiddleware({
      target: 'https://api-pub.bitfinex.com/v2',
      changeOrigin: true,
      pathRewrite: {
        '^/bitfinex': '/',
      },
    }),
  );
};
