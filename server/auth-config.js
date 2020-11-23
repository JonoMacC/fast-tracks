// enable reading from process.env
require("dotenv").config();

const env = process.env.NODE_ENV || "development";
const devMode = env === "development";
const spotifyURL = "https://accounts.spotify.com";
const devUrl = "http://localhost:3000";

/* process.env.URL from netlify BUILD environment variables */
const siteUrl = process.env.URL || devUrl;

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
  redirectUri = `${siteUrl}/api/callback`;

module.exports = {
  clientId,
  clientSecret,
  tokenHost,
  authorizePath,
  tokenPath,
  profilePath,
  redirectUri,
};
