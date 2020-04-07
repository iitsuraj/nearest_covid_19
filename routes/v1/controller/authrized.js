var Routes = require("../../../models/routes");
var Article = require("../../../models/article");
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
