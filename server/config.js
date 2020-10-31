// enable reading from process.env
require("dotenv").config();
const env = process.env.NODE_ENV || "development";
let clientId, redirectUri, clientSecret;

if (env === "development") {
  clientId = process.env.REACT_APP_TEST_CLIENT_ID;
  redirectUri = "http://localhost:3000/api/callback";
  clientSecret = process.env.REACT_APP_TEST_CLIENT_SECRET;
} else {
  clientId = process.env.REACT_APP_CLIENT_ID;
  redirectUri = process.env.REACT_APP_REDIRECT_URI;
  clientSecret = process.env.REACT_APP_CLIENT_SECRET;
}

module.exports = { clientId, redirectUri, clientSecret };
