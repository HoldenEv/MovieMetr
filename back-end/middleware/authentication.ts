import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import passportJWT from "passport-jwt";
const { Strategy: JWTStrategy, ExtractJwt: ExtractJWT } = passportJWT;
import UserModel from "../models/user";
import dotenv from "dotenv";

const secretOrKey = process.env.TOKEN_SECRET;

if (!secretOrKey) {
  throw new Error("TOKEN_SECRET environment variable is not defined");
}

dotenv.config();

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async function (email: string, password: string, cb) {
      const user = await UserModel.verifyUser(email, password);
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
      secretOrKey: secretOrKey,
    },
    function (jwtPayload, cb) {
      return cb(null, jwtPayload);
    },
  ),
);

export default passport;

// const passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;
// const passportJWT = require("passport-jwt");
// const JWTStrategy = passportJWT.Strategy;
// const ExtractJWT = passportJWT.ExtractJwt;
// const UserModel = require("../models/user");
// import dotenv from "dotenv";
// dotenv.config();

// passport.use(
//   new LocalStrategy(
//     {
//       usernameField: "email",
//       passwordField: "password",
//     },
//     async function (email: String, password: String, cb: any) {
//       let user = await UserModel.verifyUser(email, password);
//       if (!user) {
//         return cb(null, false, { message: "Incorrect email or password." });
//       }
//       return cb(null, user, { message: "Logged In Successfully" });
//     },
//   ),
// );

// passport.use(
//   new JWTStrategy(
//     {
//       jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
//       secretOrKey: process.env.TOKEN_SECRET,
//     },
//     function (jwtPayload: any, cb: any) {
//       return cb(null, jwtPayload);
//     },
//   ),
// );

// exports = passport;
