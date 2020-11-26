const routerBasePath =
  process.env.REACT_APP_NETLIFY === "true" ? `/.netlify/functions` : `/api`;

module.exports = { routerBasePath };
