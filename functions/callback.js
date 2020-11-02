const { clientId, redirectUri, authorizePath } = require("./utils/auth-config");

/* Function to handle Spotify auth callback */
exports.handler = (event, context, callback) => {
  const { code, state } = event.queryStringParameters || null;
  const response = {
    statusCode: 302,
    body: "Hello", // return body for local dev
  };
  return callback(null, response);
  /* Take the grant code and exchange for an accessToken */
  // oauth2.authorizationCode
  //   .getToken({
  //     code: code,
  //     redirect_uri: config.redirectUri,
  //     client_id: config.clientId,
  //     client_secret: config.clientSecret,
  //   })
  //   .then((result) => {
  //     const token = oauth2.accessToken.create(result);
  //     console.log("accessToken", token);
  //     return token;
  //   })
  //   // Do stuff with user data & token
  //   .then((result) => {
  //     console.log("auth token", result.token);
  //     // Do other custom stuff
  //     console.log("state", state);
  //     // return results to browser
  //     return callback(null, {
  //       statusCode: 200,
  //       body: JSON.stringify(result),
  //     });
  //   })
  //   .catch((error) => {
  //     console.log("Access Token Error", error.message);
  //     console.log(error);
  //     return callback(null, {
  //       statusCode: error.statusCode || 500,
  //       body: JSON.stringify({
  //         error: error.message,
  //       }),
  //     });
  //   });
};
