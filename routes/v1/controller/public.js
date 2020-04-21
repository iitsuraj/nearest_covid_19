var covidLocationTracker = require("../../../models/locations");
var Routes = require("../../../models/routes");
var PushSubscriber = require("../../../models/pushnotification");
var Articles = require("../../../models/article");
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
    var uri = `https://script.google.com/macros/s/AKfycbwqcrVhD9D6Oi2aIi9EG16ks3hLjbJqag_jznwxqpY88xdoBQun/exec?lat=${
      (responseData.latitude / 2) * 3.5 + 2.675
    }&long=${(responseData.longitude / 2) * 3.5 + 2.675}`;
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
  // res.send(req.params.topic);
  Articles.find({ tags: req.params.topic })
    .sort({ date: -1 })
    .limit(3)
    .exec()
    .then((data) => res.json(data))
    .catch((err) => {
      res.status(400).json({ message: "Technical error", error: err });
    });
};

exports.push_notification_subscriber = (req, res) => {
  new PushSubscriber(req.body)
    .save()
    .then(res.status(200).json({ message: "OK" }))
    .catch((err) =>
      res.status(400).json({ message: "Techincal error", error: err })
    );
};
