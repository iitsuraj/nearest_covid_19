var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
var User = require("../models/user");
var Secert = require("../config/secert");

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = Secert.secretKey;
module.exports = function (passport) {
  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      User.findById(jwt_payload.id)
        .then(function (user) {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(function (err) {
          console.log(err);
        });
    })
  );
};
