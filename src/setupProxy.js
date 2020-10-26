// Setup proxy for local development
const { createProxyMiddleware } = require("http-proxy-middleware");

// If the environment variable REACT_APP_LOCAL is set to false or undefined
// then api requests are proxied through Netlify lambda functions
// If it is set to true then api requests are proxied from the node server
module.exports = function (app) {
  if (!process.env.REACT_APP_LOCAL) {
    app.use(
      createProxyMiddleware("/.netlify/functions", {
        target: "http://localhost:8888",
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
