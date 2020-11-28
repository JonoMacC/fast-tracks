// enable reading from process.env
require("dotenv").config();

// Netlify sets process.env.NETLIFY_DEV to true when using Netlify CLI
// in production it will be false
const env = process.env.NETLIFY_DEV ? "development" : "production";
const devMode = env === "development";
const spotifyURL = "https://accounts.spotify.com";

/* process.env.URL from netlify BUILD environment variables */
const siteUrl = devMode ? process.env.URL : "https://fasttracks.app";

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
  redirectUri = `${siteUrl}/.netlify/functions/callback`;

module.exports = {
  clientId,
  clientSecret,
  tokenHost,
  authorizePath,
  tokenPath,
  profilePath,
  redirectUri,
  devMode,
  siteUrl,
};
