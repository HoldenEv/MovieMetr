var User = require("../models/user");
var passport = require("passport");
var passportJWT = require("passport-jwt");
var config = require("../config.js");
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;

var params = {
  secretOrKey: config.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

module.exports = function() {
  // put type any for payload and done becasue I do not know their types. 
  var strategy = new Strategy(params, function(payload : any, done : any) {
    User.findById(payload.id, function(err : Error, user : any) {
      if (err) {
        return done(new Error("UserNotFound"), null);
      } else if (payload.expire <= Date.now()) {
        return done(new Error("TokenExpired"), null);
      } else{
        return done(null, user);
      }
    });
  });

  passport.use(strategy);

  return { initialize: function() { return passport.initialize() }};
};

