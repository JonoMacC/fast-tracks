/**
 * API Router for interfacing with the Spotify Web API
 * handles authentication for the client (react app)
 * since the client can't have access to the client ID or
 * client secret
 */

const express = require("express");
const axios = require("axios");
const querystring = require("querystring");
const router = new express.Router();
const stateKey = "spotify_auth_state";
const {
  clientId,
  clientSecret,
  redirectUri,
  authorizePath,
  tokenPath,
} = require("./auth-config");

// requested application authorizations
const scopes = ["user-library-read", "user-top-read", "playlist-modify-public"];

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

  // redirect to Spotify authorization request login
  // your application requests authorization
  res.redirect(
    authorizePath +
      querystring.stringify({
        response_type: "code",
        show_dialog: true,
        client_id: clientId,
        scope: scopes.join("%20"),
        redirect_uri: redirectUri,
        state: state,
      })
  );
});

/**
 * The /callback endpoint - hit after the user logs in to spotifyApi
 * Verify that the state we put in the cookie matches the state in the query
 * parameter. Then, if all is good, redirect the user to the user page. If all
 * is not good, redirect the user to an error page
 */
router.get("/callback", (req, res) => {
  const { code, state } = req.query || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  // first do state validation
  if (state === null || state !== storedState) {
    res.redirect("/#/error/state mismatch");
    // if the state is valid, get the authorization code and pass it on to the client
  } else {
    res.clearCookie(stateKey);

    const authOptions = {
      method: "post",
      url: tokenPath,
      data: querystring.stringify({
        code: code,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(clientId + ":" + clientSecret).toString("base64"),
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    };

    // Retrieve an access token and a refresh token
    axios(authOptions)
      .then((response) => {
        const { expires_in, access_token, refresh_token } = response.data;

        // pass the tokens to the browser to make requests from there
        res.redirect(`/#/user/${access_token}/${refresh_token}/${expires_in}`);
      })
      .catch((err) => {
        console.log(err);
        res.redirect("/#/error/invalid token");
      });
  }
});

/*
 * The /refresh_token endpoint
 * Retrieve a refreshed access token
 */
router.get("/refresh_token", (req, res) => {
  // requesting access token from refresh token
  let refresh_token = req.query.refresh_token;
  const authOptions = {
    method: "post",
    url: tokenPath,
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(clientId + ":" + clientSecret).toString("base64"),
      "content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    data: querystring.stringify({
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    }),
  };

  axios(authOptions)
    .then((response) => {
      const { expires_in, access_token } = response.data;

      // the response could contain an updated refresh token
      // if it does, save the updated refresh token
      refresh_token = response.data.refresh_token
        ? response.data.refresh_token
        : refresh_token;

      // pass the tokens to the browser to make requests from there
      // res.redirect(`/#/user/${access_token}/${refresh_token}/${expires_in}`);
      res.status(200).send({
        access_token: access_token,
        refresh_token: refresh_token,
        expires_in: expires_in,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

/**
 * The /logout endpoint
 * Clear the access token and refresh token
 */
router.get("/logout", (req, res) => {
  // log out message
  res.send({ msg: "logged out..." });
});

module.exports = router;
