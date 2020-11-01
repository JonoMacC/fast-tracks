import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import compression from "compression";

import serverless from "serverless-http";

const app = express();
const router = require("../../server/pureRouter.js");

// gzip responses
router.use(compression());

// Attach logger
app.use(morgan("dev"));

// Setup routes
app.use("/.netlify/functions/api", router);

// Mount express middleware
router.use(cors());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// module.exports = app;
exports.handler = serverless(app);
