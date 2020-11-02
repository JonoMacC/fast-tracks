/**
 * Basic Express Server
 * the server handles authentication with the Spotify Web API
 * since the client (react app) cannot have access to the client secret
 */

// express and express middleware
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");

// router used to interface with the Spotify Web API
const router = require("./router");

const PORT = process.env.PORT || 4001;

const app = express();

// Use static server to serve the app
// Mount express middleware
app
  .use(morgan("dev"))
  .use(cors())
  .use(cookieParser())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(express.static(path.resolve(__dirname, "../public")))
  .use("/api", router);

// Start server
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
