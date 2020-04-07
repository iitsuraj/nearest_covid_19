var router = require("express").Router();
var Controller = require("./controller");

var Validator = require("../../validation");

router.post("/login", Validator.login, Controller.login);

router.post("/signup", Validator.register, Controller.signup);

router.post("/forgotpassword", Controller.forgotpassword);

module.exports = router;
