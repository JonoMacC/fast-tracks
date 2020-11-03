exports.handler = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({ message: "logged out..." }),
  };
  return callback(null, response);
};
