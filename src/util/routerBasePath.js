// enable reading from process.env
require("dotenv").config();

const routerBasePath =
  process.env.REACT_APP_NETLIFY === "true" ? `/.netlify/functions` : `/api`;

module.exports = { routerBasePath };
