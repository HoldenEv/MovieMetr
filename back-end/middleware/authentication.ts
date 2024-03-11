const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const UserModel = require("../models/user");
import dotenv from "dotenv";
dotenv.config();

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async function (email: String, password: String, cb: any) {
      let user = await UserModel.verifyUser(email, password);
      if (!user) {
        return cb(null, false, { message: "Incorrect email or password." });
      }
      return cb(null, user, { message: "Logged In Successfully" });
    },
  ),
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.TOKEN_SECRET,
    },
    function (jwtPayload: any, cb: any) {
      return cb(null, jwtPayload);
    },
  ),
);

exports = passport;
