/**
 * The /callback endpoint - hit after the user logs in to spotifyApi
 * Verify that the state we put in the cookie matches the state in the query
 * parameter. Then, if all is good, redirect the user to the user page. If all
 * is not good, redirect the user to an error page
 */

const querystring = require("querystring");
const axios = require("axios");
const {
  clientId,
  clientSecret,
  redirectUri,
  tokenPath,
} = require("./utils/auth-config");

/* Function to handle Spotify auth callback */
exports.handler = (event, context, callback) => {
  const { code, state } = event.queryStringParameters || null;

  // retrieve the auth state set on the cookie
  const storedState = event.headers.cookie
    ? event.headers.cookie.split(";")[0].split("=")[1]
    : null;

  // first do state validation
  if (state === null || state !== storedState) {
    const responseObj = {
      headers: {
        Location: `${process.env.URL}/#/error/state%20mismatch`,
        "Cache-Control": "no-cache", // Disable caching of this response
      },
    };

    const response = {
      statusCode: 302, // must be a redirect status code or the client won't be redirected
      body: JSON.stringify(responseObj),
    };

    return callback(null, response);
    // if the state is valid, get the authorization code and pass it on to the client
  } else {
    const stateCookie = null;
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
        const redirectObj = {
          headers: {
            Location: `${process.env.URL}/#/user/${access_token}/${refresh_token}/${expires_in}`,
            "Cache-Control": "no-cache", // Disable caching of this response
            "Set-Cookie": stateCookie, // clear the auth state cookie
            "Content-Type": "text/html",
          },
        };

        const redirect = {
          statusCode: 302, // must be a redirect status code or the client won't be redirected
          body: JSON.stringify(redirectObj),
        };
        return callback(null, redirect);
      })
      .catch((err) => {
        console.log(err);
        const responseObj = {
          headers: {
            Location: `${process.env.URL}/#/error/invalid token`,
            "Cache-Control": "no-cache", // Disable caching of this response
            "Set-Cookie": stateCookie, // clear the auth state cookie
            "Content-Type": "text/html",
          },
        };
        const response = {
          statusCode: 302, // must be a redirect status code or the client won't be redirected
          body: JSON.stringify(responseObj),
        };
        return callback(null, response);
      });
  }
};
