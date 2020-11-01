const routerBasePath =
  process.env.REACT_APP_NETLIFY === "true" ? `/.netlify/functions/api` : `/api`;

export default routerBasePath;
