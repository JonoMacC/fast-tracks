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
    const response = {
      statusCode: 302, // must be a redirect status code or the client won't be redirected
      headers: {
        Location: `${process.env.URL}/#/error/state%20mismatch`,
        "Cache-Control": "no-cache", // Disable caching of this response
      },
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
        const redirect = {
          statusCode: 302, // must be a redirect status code or the client won't be redirected
          headers: {
            Location: `${process.env.URL}/#/user/${access_token}/${refresh_token}/${expires_in}`,
            "Cache-Control": "no-cache", // Disable caching of this response
            "Set-Cookie": stateCookie, // clear the auth state cookie
          },
        };
        return callback(null, redirect);
      })
      .catch((err) => {
        console.log(err);
        const response = {
          statusCode: 302, // must be a redirect status code or the client won't be redirected
          headers: {
            Location: `${process.env.URL}/#/error/invalid token`,
            "Cache-Control": "no-cache", // Disable caching of this response
            "Set-Cookie": stateCookie, // clear the auth state cookie
          },
        };
        return callback(null, response);
      });
  }
};
