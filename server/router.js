/**
 * API Router for interfacing with the Spotify Web API
 * handles authentication for the client (react app)
 * since the client can't have access to the client ID or
 * client secret
 */

const Spotify = require("spotify-web-api-node");
const express = require("express");
const router = new express.Router();
const { clientId, redirectUri, clientSecret } = require("./config");
const stateKey = "spotify_auth_state";

// requested application authorizations
const scopes = ["user-library-read", "user-top-read", "playlist-modify-public"];

// configure Spotify
const spotifyApi = new Spotify({
  clientId: clientId,
  clientSecret: clientSecret,
  redirectUri: redirectUri,
});

//  Generates a random string containing numbers and letters
//  @param  {number} length The length of the string
//  @return {string} The generated string
const generateRandomString = (length) => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

/**
 * The /login endpoint
 * Redirect the client to the spotify authorize url, but first set that user's
 * state in the cookie.
 */
router.get("/login", (req, res) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state); // sets a cookie @ (key, value)
  res.redirect(spotifyApi.createAuthorizeURL(scopes, state, true));
});

/**
 * The /callback endpoint - hit after the user logs in to spotifyApi
 * Verify that the state we put in the cookie matches the state in the query
 * parameter. Then, if all is good, redirect the user to the user page. If all
 * is not good, redirect the user to an error page
 */
router.get("/callback", (req, res) => {
  // your application requests refresh and access tokens
  // after checking the state parameter

  const { code, state } = req.query || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  // first do state validation
  if (state === null || state !== storedState) {
    res.redirect("/#/error/state mismatch");
    // if the state is valid, get the authorization code and pass it on to the client
  } else {
    res.clearCookie(stateKey);
    // Retrieve an access token and a refresh token
    spotifyApi
      .authorizationCodeGrant(code)
      .then((data) => {
        const { expires_in, access_token, refresh_token } = data.body;

        // pass the tokens to the browser to make requests from there
        res.redirect(`/#/user/${access_token}/${refresh_token}/${expires_in}`);
      })
      .catch((err) => {
        res.redirect("/#/error/invalid token");
      });
  }
});

/*
 * The /refresh endpoint
 * Retrieve a refreshed access token
 */
router.get("/refresh", (req, res) => {
  spotifyApi.refreshAccessToken().then((data) => {
    const { expires_in, access_token, refresh_token } = data.body;

    // set the new access token on the spotify api object
    spotifyApi.setAccessToken(access_token);

    // pass the tokens to the browser to make requests from there
    res.redirect(`/#/user/${access_token}/${refresh_token}/${expires_in}`);
  });
});

/**
 * The /logout endpoint
 * Clear the access token and refresh token
 */
router.get("/logout", (req, res) => {
  // reset tokens
  spotifyApi.resetAccessToken();
  spotifyApi.resetRefreshToken();

  // log out message
  res.send({ msg: "logged out..." });
});

module.exports = router;
