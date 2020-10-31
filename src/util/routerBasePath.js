// enable reading from process.env
require("dotenv").config();

const routerBasePath = process.env.REACT_APP_NETLIFY
  ? `/.netlify/functions/api`
  : `/api`;

export default routerBasePath;
