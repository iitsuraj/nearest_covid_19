var Validator = require("validator");
var isEmpty = require("./is-empty");
var Route = require("../models/routes");
var User = require("../models/user");

exports.register = (req, res, next) => {
  let errors = {};
  req.body.name = !isEmpty(req.body.name) ? req.body.name : "";
  req.body.email = !isEmpty(req.body.email) ? req.body.email : "";
  req.body.password = !isEmpty(req.body.password) ? req.body.password : "";

  if (!Validator.isLength(req.body.name, { min: 3, max: 30 })) {
    errors.name = "Name must be between 3 and 30 characters";
  }

  if (Validator.isEmpty(req.body.name)) {
    errors.name = "Name field is required";
  }

  if (!Validator.isEmail(req.body.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(req.body.email)) {
    errors.email = "Email field is required";
  }

  if (Validator.isEmpty(req.body.password)) {
    errors.password = "Password field is required";
  }

  if (!isEmpty(errors)) {
    res.status(400).json({
      message: "An error occurred when saving database",
      errors: errors,
    });
  } else {
    User.findOne({ email: req.body.email })
      .then((existinguser) => {
        if (existinguser) {
          errors.email = "Email already registered";
          res.status(400).json({
            message: "An error occurred when saving database",
            errors: errors,
          });
        } else {
          if (!isEmpty(errors)) {
            res.status(400).json({
              message: "An error occurred when saving database",
              errors: errors,
            });
          } else {
            return next();
          }
        }
      })
      .catch((err) => {
        console.log(err);
        res
          .status(400)
          .json({ message: "We are Facing Technical Error", err: err });
      });
  }
};

exports.login = (req, res, next) => {
  let errors = {};
  req.body.email = !isEmpty(req.body.email) ? req.body.email : "";
  req.body.password = !isEmpty(req.body.password) ? req.body.password : "";

  if (!Validator.isEmail(req.body.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(req.body.email)) {
    errors.email = "Email field is required";
  }

  if (Validator.isEmpty(req.body.password)) {
    errors.password = "Password field is required";
  }

  if (!isEmpty(errors)) {
    res.status(400).json({
      message: "An error occurred when saving database",
      errors: errors,
    });
  } else {
    return next();
  }
};

exports.register_route = (req, res, next) => {
  let errors = {};
  req.body.name = !isEmpty(req.body.name) ? req.body.name : "";
  req.body.description = !isEmpty(req.body.description)
    ? req.body.description
    : "";
  req.body.path = !isEmpty(req.body.path) ? req.body.path : "";
  req.body.type = !isEmpty(req.body.type) ? req.body.type : "";

  if (Validator.isEmpty(req.body.name)) {
    errors.name = "Name field is required";
  }
  if (Validator.isEmpty(req.body.description)) {
    errors.description = "Description field is required";
  }
  if (Validator.isEmpty(req.body.path)) {
    errors.path = "Path field is required";
  }
  if (Validator.isEmpty(req.body.type)) {
    errors.type = "Type field is required";
  }
  if (!isEmpty(errors)) {
    res.status(400).json({
      message: "An error occurred when saving database",
      errors: errors,
    });
  } else {
    return next();
  }
};

exports.articel = (req, res, next) => {
  let errors = {};

  req.body.heading = !isEmpty(req.body.heading) ? req.body.heading : "";
  req.body.description = !isEmpty(req.body.description)
    ? req.body.description
    : "";
  req.body.url = !isEmpty(req.body.url) ? req.body.url : "";
  req.body.image = !isEmpty(req.body.image) ? req.body.image : "";

  req.body.tag = !isEmpty(req.body.tag) ? req.body.tag : "";

  if (!Validator.isLength(req.body.heading, { min: 10, max: 60 })) {
    errors.heading = "Heading must be between 10 and 60 characters";
  }

  if (Validator.isEmpty(req.body.heading)) {
    errors.heading = "Heading field is required";
  }
  if (Validator.isEmpty(req.body.tag)) {
    errors.tag = "Tags field is required";
  }

  if (Validator.isEmpty(req.body.description)) {
    errors.description = "Description field is required";
  }

  if (Validator.isEmpty(req.body.url)) {
    errors.url = "Url field is required";
  }

  if (Validator.isEmpty(req.body.image)) {
    errors.image = "Image url field is required";
  }

  if (!isEmpty(errors)) {
    res.status(400).json({
      message: "An error occurred when saving database",
      errors: errors,
    });
  } else {
    return next();
  }
};
