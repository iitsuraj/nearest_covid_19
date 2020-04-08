var User = require("../../../models/user");
var jwt = require("jsonwebtoken");
var Secrectkey = require("../../../config/secert");
// Generate secrect key for access authrized route
exports.login = (req, res) => {
  let errors = {};
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        errors.email = "No user found";
        return res.status(400).json({
          message: "An error occurred when login",
          errors: errors,
        });
      }
      if (!user.comparePassword(req.body.password)) {
        errors.password = "Password incorrect";
        return res.status(400).json({
          message: "An error occurred when login",
          errors: errors,
        });
      } else {
        var payload = {
          id: user._id,
          name: user.name,
          email: user.email,
        };
        jwt.sign(payload, Secrectkey.secretKey, function (err, token) {
          res.json({
            success: true,
            token: "bearer " + token,
          });
        });
      }
    })
    .catch((err) => res.json({ message: "Unable to login", error: err }));
};
// Register for use authrized route
exports.signup = (req, res) => {
  var user = {};
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  new User(user)
    .save()
    .then(
      res.json({
        message: "🎉 Congratulations you have successfully register 🎉",
      })
    )
    .catch((err) =>
      res
        .status(400)
        .json({ message: "We are Facing Technical Error", error: err })
    );
};
// Request for password change
exports.forgotpassword = (req, res) => {
  res.send("NOT IMPLEMENTED");
};
