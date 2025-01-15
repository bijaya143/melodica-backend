const express = require("express");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const mongoose = require("mongoose");
const config = require("./config");
const bodyParser = require("body-parser");
const middleware = require("./util/middlewares");
const { router } = require("./routes/index");
const errorHandler = require("errorhandler");
const fileUpload = require("express-fileupload");
const path = require("path");

const app = express();

const corsOptions = {
  origin: true,
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(compression());

// Use node like promise for mongoose
mongoose.Promise = global.Promise;

// Connect Mongo DB
mongoose.connect(`${config.MONGO_URL}`);

// Body Parser
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" })); // Parse application/x-www-form-urlencoded
app.use(bodyParser.json({ limit: "50mb" }));

// Info route
app.get("/", (req, res) => {
  return res.status(200).json({
    version: config.VERSION,
    name: "Welcome to Sangeet Backend",
  });
});

// Media Files
app.use(fileUpload());

app.use(express.static(path.join("public/uploads")));

// API
app.use("/api", router);

// Error Handler
app.use(errorHandler());
app.use(middleware.notFound);
app.use(middleware.errorHandler);

app.listen(config.PORT, () => {
  console.log(`Listening: http://localhost:${config.PORT}`);
});

module.exports = app;
