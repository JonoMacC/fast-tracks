exports.handler = (event, context, callback) => {
  const response = {
    statusCode: 302,
    body: "Hello", // return body for local dev
  };
  return callback(null, response);
};
