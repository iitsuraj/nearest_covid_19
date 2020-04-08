var q = require("q");
var { pushController } = require("../../../controller");
var Routes = require("../../../models/routes");
var Article = require("../../../models/article");
var Subscriber = require("../../../models/pushnotification");
var keys = require("../../../config/secert");
// Display all routes
exports.default = (req, res) => {
  var route = {};
  route.name = req.body.name;
  route.path = req.body.path;
  route.description = req.body.description;
  route.type = req.body.type;
  new Routes(route)
    .save()
    .then((data) =>
      res.json({
        message: "Your route successfully saved to Database",
        route: data,
      })
    )
    .catch((err) => {
      console.log(err);
      res
        .status(400)
        .json({ message: "We are Facing Technical Error", err: err });
    });
};

exports.articles = (req, res) => {
  var article = {};
  article.heading = req.body.heading;
  article.description = req.body.description;
  article.url = req.body.url;
  article.image = req.body.image;
  article.tags = req.body.tag;
  new Article(article)
    .save()
    .then(res.json({ message: "article successfully added" }))
    .catch((err) => {
      res.status(400).json({ message: "Technical error", error: err });
    });
};

exports.send_push = (req, res) => {
  var payload = {
    title: req.body.title,
    message: req.body.message,
    url: req.body.url,
    ttl: 1000,
    icon: req.body.icon,
    image: req.body.image,
    badge: req.body.badge,
    tag: req.body.tag,
  };
  Subscriber.find()
    .then((subscriptions) => {
      let parallelSubscriptionCalls = subscriptions.map((subscription) => {
        pushController
          .sendPushNotification(subscription, payload, keys)
          .catch((err) => {
            Subscriber.findByIdAndDelete({ _id: err.id }).exec();
          });
      });
      q.allSettled(parallelSubscriptionCalls)
        .then((pushResults) => {
          res.json({
            message: "Push triggered",
            data: pushResults,
          });
        })
        .catch((err) => {
          res.status(400).json({ message: "Technical error", error: err });
        });
    })
    .catch((err) => {
      res.status(400).json({ message: "Technical error", error: err });
    });
};
