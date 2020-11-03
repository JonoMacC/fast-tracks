exports.handler = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: "logged out...",
  };
  return callback(null, response);
};
