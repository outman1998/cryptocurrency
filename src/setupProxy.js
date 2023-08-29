import { createProxyMiddleware } from 'http-proxy-middleware';

export default (app) => {
  app.use(
    '/coingecko',
    createProxyMiddleware({
      target: 'https://api.coingecko.com/api/v3',
      changeOrigin: true,
      pathRewrite: {
        '/coingecko': '/',
      },
    })
  );
};