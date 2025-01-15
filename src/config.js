const dotenv = require("dotenv");

// config dotenv to read the .env file variables
dotenv.config();

module.exports = {
  ENV: process.env.ENV || "local",
  PORT: process.env.PORT || "8484",
  KEY: process.env.KEY || "",

  JWT_KEY: process.env.JWT_KEY || "",

  UPLOAD_DIR: process.env.UPLOAD_DIR || "uploads",
  LOG_DIR: process.env.LOG_DIR || "logs",
  LOG_LEVEL: process.envLOG_LEVEL || "debug",

  MONGO_URL: process.env.MONGO_URL || "",

  FILE_PATH: process.env.FILE_PATH || "",
};
