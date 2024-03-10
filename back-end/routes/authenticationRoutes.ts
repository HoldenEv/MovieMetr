import { Router, Request, Response } from "express";
import User from "../models/user";
import accountController from "../controllers/accountController";
import { body, validationResult } from "express-validator";

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

const validateRegisterInput = [
  body("username").notEmpty(),
  body("email").isEmail(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number"),
];

const validate = (req: Request, res: Response, next: Function) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

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
