// Setup proxy for local development
const { createProxyMiddleware } = require("http-proxy-middleware");

// If running using Netlify CLI, API requests are proxied through Netlify lambda functions
// otherwise, API requests are proxied from the node server
module.exports = function (app) {
  if (process.env.NETLIFY_DEV) {
    app.use(
      createProxyMiddleware("/.netlify/functions", {
        target: "http://localhost:8888/",
      })
    );
  } else {
    app.use(
      createProxyMiddleware("/api", {
        target: "http://localhost:4001",
        changeOrigin: true,
      })
    );
  }
};
