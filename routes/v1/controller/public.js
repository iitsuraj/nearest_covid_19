var covidLocationTracker = require("../../../models/locations");
var Routes = require("../../../models/routes");
var fetch = require("node-fetch");
var url = require("url");

// Display all routes
exports.default = (req, res) => {
  Routes.find()
    .then((data) => res.json(data))
    .catch((err) => {
      console.log(err);
      res.json({ message: "We are facing Technical error", err: err });
    });
};

// Display nearest patient location in KM
exports.neatestpatient_km = (req, res) => {
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
        new covidLocationTracker(LocationData).save().then(() => {
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
};

exports.articles = (req, res) => {
  res.send(req.params.topic);
};
