const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    proxy('/api', {
      target: 'http://localhost:8180/',
      pathRewrite: {
        '^/api/': '/'
      }
    })
  );
  app.use(proxy('/upload', { target: 'http://localhost:8180/' }));
};
