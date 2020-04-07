var router = require("express").Router();
var passport = require("passport");
var Validator = require("../../validation");
var PublicController = require("./controller/public");
var AuthRouteController = require("./controller/authrized");
/* 
    @route   GET /v1/
    @desc    List all the current routes available with detail on each.
    @access  Public
*/

router.get("/", PublicController.default);
/* 
    @route   POST /v1/
    @desc    Register a route
    @access  Private
*/
router.post(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  Validator.register_route,
  AuthRouteController.default
);

/* 
    @route   GET /v1/nearestpatient
    @desc    Send JSON Response that have nearest corona patient distance in km
    @access  Public
*/

router.get("/nearestpatient", PublicController.neatestpatient_km);

/* 
    @route   GET /v1/articles/:topic
    @desc    Send JSON Response that have nearest corona patient distance in km
    @access  Public
*/

router.get("/articles/:topic", PublicController.articles);

router.post(
  "/articles",
  passport.authenticate("jwt", {
    session: false,
  }),
  Validator.articel,
  AuthRouteController.articles
);
module.exports = router;
