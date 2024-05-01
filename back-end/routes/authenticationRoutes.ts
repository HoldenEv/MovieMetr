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
  updateUser,
  getUser,
  followUser,
  unfollowUser,
  getFollowing,
  getFollowers,
} from "../controllers/accountController";
import { Strategy as LocalStrategy } from "passport-local";
import bodyParser from "body-parser";
import passport from "passport";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
const router = Router();
dotenv.config();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(passport.initialize());

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      session: false,
    },
    User.authenticate(),
  ),
);

type User = {
  _id?: number;
};

passport.serializeUser((user: User, done) => {
  done(null, user._id);
});

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
  },
);

//route to login a user, calls loginUser function from accountController
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const result = await loginUser(username, password);
    //currently returns the user object nice for testing
    res.json(result);
  } catch (error) {
    let message = "Unknown error";
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(400).send({ message: message });
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
    let message = "Unknown error";
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(409).send({ message: message });
  }
});

//ROUTES FOR USER PROFILE UPDATES--------------------------------------------

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
    const { userId, newPassword, oldPassword } = req.body;
    const updatedUser = await updatePassword(userId, oldPassword, newPassword);
    res.json({ message: "Password updated", user: updatedUser });
  } catch (error) {
    console.error("Error updating password", error);
    res.status(500).send("Error updating password");
  }
});

//route to update all user fields in one go, calls updateUser function from accountController
//needs a user id, email, username, bio, and profilePath in req body
router.post("/updateUser", async (req: Request, res: Response) => {
  try {
    const { userId, email, username, bio, profilePath } = req.body;
    const updatedUser = await updateUser(
      userId,
      email,
      username,
      bio,
      profilePath,
    );
    res.json({ message: "User updated", user: updatedUser });
  } catch (error) {
    console.error("Error updating user", error);
    res.status(500).send("Error updating user");
  }
});

//route takes a user id, grabs user object using getUser function from accountController
router.get("/getUser", async (req: Request, res: Response) => {
  try {
    //may need to chnage in all routes based on where in the req the user id is
    const userId = req.query.userId as string;
    const user = await getUser(userId);
    res.json(user);
  } catch (error) {
    console.error("Error getting user", error);
    res.status(500).send("Error getting user");
  }
});

//ROUTES FOR FOLLOWING LOGIC---------------------------------------------

//route to follow a user, calls followUser function from accountController
router.post("/followUser", async (req: Request, res: Response) => {
  try {
    const { userId, followId } = req.body;
    const updatedUser = await followUser(userId, followId);
    res.json({ message: "User followed", user: updatedUser });
  } catch (error) {
    console.error("Error following user", error);
    res.status(500).send("Error following user");
  }
});

//route to unfollow a user, calls unfollowUser function from accountController
router.post("/unfollowUser", async (req: Request, res: Response) => {
  try {
    const { userId, followId } = req.body;
    const updatedUser = await unfollowUser(userId, followId);
    res.json({ message: "User unfollowed", user: updatedUser });
  } catch (error) {
    console.error("Error unfollowing user", error);
    res.status(500).send("Error unfollowing user");
  }
});

//route to get a user's following list, calls getFollowing function from accountController
router.get("/getFollowing", async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string;
    const following = await getFollowing(userId);
    res.json(following);
  } catch (error) {
    console.error("Error getting following", error);
    res.status(500).send("Error getting following");
  }
});

//route to get a user's followers list, calls getFollowers function from accountController
router.get("/getFollowers", async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string;
    const followers = await getFollowers(userId);
    res.json(followers);
  } catch (error) {
    console.error("Error getting followers", error);
    res.status(500).send("Error getting followers");
  }
});

export default router;
