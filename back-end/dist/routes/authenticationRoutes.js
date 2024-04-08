"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("../models/user"));
const accountController_1 = require("../controllers/accountController");
const authenticationMiddleware = require("../middleware/authentication");
const LocalStrategy = require("passport-local");
const bodyParser = require("body-parser");
const passport = require("passport");
const mongoose = require("mongoose");
const dotenv = __importStar(require("dotenv"));
const router = (0, express_1.Router)();
dotenv.config();
router.use(bodyParser.urlencoded({ extended: false }));
mongoose.connect(process.env.URI);
router.use(passport.initialize());
passport.use(new LocalStrategy({
    usernameField: "username",
    passwordField: "password",
    session: false,
}, user_1.default.authenticate()));
passport.serializeUser(user_1.default.serializeUser());
//defaut route for /authentication
router.get("/", (req, res) => {
    res.send("Nothin Here");
});
//route to get a user's profile, calls getProfile function from accountController
//passport.authenticate takes a bearer token from the header of the req, verifies it,
//then populates req.user with the user object and req.query.secret_token with the token
router.get("/profile", passport.authenticate("jwt", { session: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json({
            message: "You made it to the secured profile",
            user: req.user,
            token: req.query.secret_token,
        });
    }
    catch (error) {
        console.error("Error getting profile", error);
        res.status(500).send("Error getting profile");
    }
}));
//route to login a user, calls loginUser function from accountController
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const result = yield (0, accountController_1.loginUser)(username, password);
        //currently returns the user object nice for testing
        res.json(result);
    }
    catch (error) {
        console.error("Error logging in", error);
        res.status(500).send("Error logging in");
    }
}));
//route to register a user, calls registerUser function from accountController
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const result = yield (0, accountController_1.registerUser)(email, username, password);
        //currently returns the user object nice for testing
        res.json(result);
    }
    catch (error) {
        console.error("Error registering", error);
        res.status(500).send("Error registering");
    }
}));
//route update a user's email, calls updateEmail function from accountController
//which takes a user id and new email in req body
router.post("/updateEmail", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, email } = req.body;
        const updatedUser = yield (0, accountController_1.updateEmail)(userId, email);
        res.json({ message: "Email updated", user: updatedUser });
    }
    catch (error) {
        console.error("Error updating email", error);
        res.status(500).send("Error updating email");
    }
}));
//route to update a user's username, calls updateUsername function from accountController
//takes a user id and new username in req body
router.post("/updateUsername", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, username } = req.body;
        const updatedUser = yield (0, accountController_1.updateUsername)(userId, username);
        res.json({ message: "Username updated", user: updatedUser });
    }
    catch (error) {
        console.error("Error updating username", error);
        res.status(500).send("Error updating username");
    }
}));
//route to update a user's bio, calls updateBio function from accountController
//takes a user id and new bio in req body
router.post("/updateBio", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, bio } = req.body;
        const updatedUser = yield (0, accountController_1.updateBio)(userId, bio);
        res.json({ message: "Bio updated", user: updatedUser });
    }
    catch (error) {
        console.error("Error updating bio", error);
        res.status(500).send("Error updating bio");
    }
}));
//route to update a user's profile picture, calls updateProfilePath function from accountController
//takes a user id and new profilePath in req body
router.post("/updateProfilePath", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, profilePath } = req.body;
        const updatedUser = yield (0, accountController_1.updateProfilePath)(userId, profilePath);
        res.json({ message: "Profile picture updated", user: updatedUser });
    }
    catch (error) {
        console.error("Error updating profile picture", error);
        res.status(500).send("Error updating profile picture");
    }
}));
//route to update a user's password, calls updatePassword function from accountController
//takes a user id and new password in req body
router.post("/updatePassword", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, newPassword, oldPassword } = req.body;
        const updatedUser = yield (0, accountController_1.updatePassword)(userId, oldPassword, newPassword);
        res.json({ message: "Password updated", user: updatedUser });
    }
    catch (error) {
        console.error("Error updating password", error);
        res.status(500).send("Error updating password");
    }
}));
exports.default = router;
