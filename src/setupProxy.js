// Setup proxy for local development
const { createProxyMiddleware } = require("http-proxy-middleware");

// the proxy is needed when running the node server instead of using
// netlify CLI
module.exports = function (app) {
  if (!process.env.REACT_APP_NETLIFY) {
    app.use(
      createProxyMiddleware("/api", {
        target: "http://localhost:4001",
        changeOrigin: true,
      })
    );
  }
  app.use(
    createProxyMiddleware("/.netlify/functions", {
      target: "http://localhost:9000/",
    })
  );
};
