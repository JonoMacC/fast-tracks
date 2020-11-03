/*
 * The /refresh_token endpoint
 * Retrieve a refreshed access token
 */

const querystring = require("querystring");
const axios = require("axios");
const { clientId, clientSecret, tokenPath } = require("./utils/auth-config");

/* Function to handle refreshing an access token */
exports.handler = (event, context, callback) => {
  // requesting access token from refresh
  // get the refresh token from the query
  let refresh_token = event.queryStringParameters.refresh_token;

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
      const redirect = {
        statusCode: 302, // must be a redirect status code or the client won't be redirected
        headers: {
          Location: `${process.env.URL}/#/user/${access_token}/${refresh_token}/${expires_in}`,
          "Cache-Control": "no-cache", // Disable caching of this response
        },
      };
      return callback(null, redirect);
    })
    .catch((err) => {
      return callback(err);
    });
};