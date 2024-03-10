import { Router } from "express";
import {
  validateRegisterInput,
  validate,
} from "../middleware/validators/authenticationValidators";
import User from "../models/user";
import accountController from "../controllers/accountController";

const authenticationMiddleware = require("../middleware/authentication");
const LocalStrategy = require("passport-local");
const bodyParser = require("body-parser");
const passport = require("passport");
const mongoose = require("mongoose");
import * as dotenv from "dotenv";
const router = Router();
dotenv.config();

router.use(bodyParser.urlencoded({ extended: false }));
mongoose.connect(process.env.URI);
router.use(passport.initialize());

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      session: false,
    },
    User.authenticate()
  )
);
passport.serializeUser(User.serializeUser());
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  accountController.profile
);
router.post("/login", accountController.login);
router.post(
  "/register",
  validateRegisterInput,
  validate,
  accountController.register
);
router.post("/update", accountController.update);

export default router;
