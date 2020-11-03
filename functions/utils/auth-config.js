// enable reading from process.env
require("dotenv").config();

const routerBasePath = `/.netlify/functions`;
const env = process.env.NODE_ENV || "development";
const devMode = env === "development" || process.env.NETLIFY_DEV;
const spotifyURL = "https://accounts.spotify.com";
const devURL = process.env.NETLIFY_DEV
  ? "http://localhost:8888"
  : "http://localhost:3000";

/* process.env.URL from netlify BUILD environment variables */
const siteUrl = process.env.URL || devURL;

const clientId = devMode
    ? process.env.REACT_APP_TEST_CLIENT_ID
    : process.env.REACT_APP_CLIENT_ID,
  clientSecret = devMode
    ? process.env.REACT_APP_TEST_CLIENT_SECRET
    : process.env.REACT_APP_CLIENT_SECRET,
  tokenHost = spotifyURL,
  authorizePath = `${spotifyURL}/authorize?`,
  tokenPath = `${spotifyURL}/api/token`,
  profilePath = `${spotifyURL}/v1/me/`,
  redirectUri = `${siteUrl}${routerBasePath}/callback`;

module.exports = {
  clientId,
  clientSecret,
  tokenHost,
  authorizePath,
  tokenPath,
  profilePath,
  redirectUri,
};
