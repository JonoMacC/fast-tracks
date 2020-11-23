// Setup proxy for local development
const { createProxyMiddleware } = require("http-proxy-middleware");

// Setup proxy for local development
module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://localhost:4001",
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/.netlify/functions", {
      target: "http://localhost:9000/",
    })
  );
};
