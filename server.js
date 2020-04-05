var express = require("express");
var fetch = require("node-fetch");
var url = require("url");
var mongoose = require("mongoose");
var cors = require("cors");
var UserLocation = require("./models/locations");
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

var app = express();

app.use(cors());

var oneYear = 1 * 365 * 24 * 60 * 60 * 1000;
app.use(express.static(__dirname + "/public", { maxAge: oneYear }));
app.set("trust proxy", true);

app.get("/", (req, res) => {
  res.send("OK");
});

// How call - http://localhost/api/v1/nearestpatient?latitude=&longitude
app.get("/api/v1/nearestpatient", (req, res, next) => {
  let url_parts = url.parse(req.url, true),
    responseData = url_parts.query;
  if (responseData.latitude && responseData.longitude) {
    var LocationData = {};
    LocationData.ip = req.ip;
    LocationData.host = req.hostname;
    LocationData.location = {};
    LocationData.location.coordinates = [
      responseData.latitude,
      responseData.longitude,
    ];
    var uri = `https://script.google.com/macros/s/AKfycbwqcrVhD9D6Oi2aIi9EG16ks3hLjbJqag_jznwxqpY88xdoBQun/exec?lat=${responseData.latitude}&long=${responseData.longitude}`;
    fetch(uri)
      .then((response) => response.json())
      .then((data) => {
        LocationData.nearestpatient = data;
        new UserLocation(LocationData).save().then(() => {
          res.json({
            nearestpatient: data,
          });
        });
      })
      .catch((err) => {
        // console.log(err);
        res.send("We are facing Technical error");
      });
  } else {
    res.send("Invalid Data");
  }
});

app.listen(process.argv[2] || 3000 || process.env.PORT, () => {
  console.log("server running on port 3000");
});
