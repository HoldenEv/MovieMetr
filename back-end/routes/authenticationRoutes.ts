import { Router, Request, Response } from "express";
import User from "../models/user";
import {
  loginUser,
  registerUser,
  updateBio,
  updateEmail,
  updateProfilePath,
  updateUsername,
  updatePassword,
} from "../controllers/accountController";
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

//defaut route for /authentication
router.get("/", (req: Request, res: Response) => {
  res.send("Nothin Here");
});

//route to get a user's profile, calls getProfile function from accountController
//passport.authenticate takes a bearer token from the header of the req, verifies it,
//then populates req.user with the user object and req.query.secret_token with the token
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  async (req: Request, res: Response) => {
    try {
      res.json({
        message: "You made it to the secured profile",
        user: req.user,
        token: req.query.secret_token,
      });
    } catch (error) {
      console.error("Error getting profile", error);
      res.status(500).send("Error getting profile");
    }
  }
);

//route to login a user, calls loginUser function from accountController
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { username,password } = req.body;
    const result = await loginUser(username,password);
    //currently returns the user object nice for testing
    res.json(result);
  } catch (error) {
    console.error("Error logging in", error);
    res.status(500).send("Error logging in");
  }
});

//route to register a user, calls registerUser function from accountController
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const result = await registerUser(email, username, password);
    //currently returns the user object nice for testing
    res.json(result);
  } catch (error) {
    console.error("Error registering", error);
    res.status(500).send("Error registering");
  }
});

//route update a user's email, calls updateEmail function from accountController
//which takes a user id and new email in req body
router.post("/updateEmail", async (req: Request, res: Response) => {
  try {
    const { userId, email } = req.body;
    const updatedUser = await updateEmail(userId, email);
    res.json({ message: "Email updated", user: updatedUser });
  } catch (error) {
    console.error("Error updating email", error);
    res.status(500).send("Error updating email");
  }
});

//route to update a user's username, calls updateUsername function from accountController
//takes a user id and new username in req body
router.post("/updateUsername", async (req: Request, res: Response) => {
  try {
    const { userId, username } = req.body;
    const updatedUser = await updateUsername(userId, username);
    res.json({ message: "Username updated", user: updatedUser });
  } catch (error) {
    console.error("Error updating username", error);
    res.status(500).send("Error updating username");
  }
});

//route to update a user's bio, calls updateBio function from accountController
//takes a user id and new bio in req body
router.post("/updateBio", async (req: Request, res: Response) => {
  try {
    const { userId, bio } = req.body;
    const updatedUser = await updateBio(userId, bio);
    res.json({ message: "Bio updated", user: updatedUser });
  } catch (error) {
    console.error("Error updating bio", error);
    res.status(500).send("Error updating bio");
  }
});

//route to update a user's profile picture, calls updateProfilePath function from accountController
//takes a user id and new profilePath in req body
router.post("/updateProfilePath", async (req: Request, res: Response) => {
  try {
    const { userId, profilePath } = req.body;
    const updatedUser = await updateProfilePath(userId, profilePath);
    res.json({ message: "Profile picture updated", user: updatedUser });
  } catch (error) {
    console.error("Error updating profile picture", error);
    res.status(500).send("Error updating profile picture");
  }
});

//route to update a user's password, calls updatePassword function from accountController
//takes a user id and new password in req body
router.post("/updatePassword", async (req: Request, res: Response) => {
  try {
    const { userId,newPassword,oldPassword } = req.body;
    const updatedUser = await updatePassword(userId, oldPassword,newPassword);
    res.json({ message: "Password updated", user: updatedUser });
  } catch (error) {
    console.error("Error updating password", error);
    res.status(500).send("Error updating password");
  }
});
export default router;
