// Setup proxy for local development
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://localhost:4001",
      changeOrigin: true,
    })
  );
  if (process.env.NETLIFY_DEV) {
    app.use(
      createProxyMiddleware("/.netlify/functions", {
        target: "http://localhost:8888/",
      })
    );
  } else {
    app.use(
      createProxyMiddleware("/.netlify/functions", {
        target: "http://localhost:9000/",
      })
    );
  }
};
