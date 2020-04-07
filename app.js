var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");
var helmet = require("helmet");
var morgan = require("morgan");
var passport = require("passport");
var bodyParser = require("body-parser");

var app = express();
mongoose
  .connect(
    "mongodb://suraj:suraj@fmc-shard-00-00-fsipp.mongodb.net:27017,fmc-shard-00-01-fsipp.mongodb.net:27017,fmc-shard-00-02-fsipp.mongodb.net:27017/mediport?ssl=true&replicaSet=fmc-shard-0&authSource=admin&retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
require("./config/passport-jwt")(passport);
app.disable("x-powered-by");
app.set("trust proxy", true);
app.use(morgan("dev"));

/*
    Check server status
*/
app.get("/", (req, res) => {
  res.send("OK");
});

/* 
    @desc    Auth routes Login, Signup, ForogtPassword
    @access  Public
*/

app.use("/", require("./routes/auth"));

/* 
    @desc    V1 api responder
    @access  GET::Public,POST::Private,PUT::Private,DELETE::Private
*/
app.use("/v1", require("./routes/v1"));

module.exports = app;
