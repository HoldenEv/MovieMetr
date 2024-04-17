"use strict";
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
exports.updatePassword = exports.updateProfilePath = exports.updateBio = exports.updateUsername = exports.updateEmail = exports.registerUser = exports.loginUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const config_1 = __importDefault(require("../config"));
const jwt_simple_1 = __importDefault(require("jwt-simple"));
//responsible for logging in a user, takes in a username and returns a token
//password verificationis not yet handled
const loginUser = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne({ username: username }).exec();
    if (!user) {
        throw new Error("Username not found");
    }
    //handles password verification
    const isAuthenticated = yield new Promise((resolve, reject) => {
        user.authenticate(password, (err, result) => {
            if (err) {
                reject(err);
            }
            else if (!result) {
                reject(new Error("Incorrect password"));
            }
            else {
                resolve(true);
            }
        });
    });
    if (!isAuthenticated) {
        throw new Error("Incorrect password");
    }
    //creates a payload with the user id and an expiration date of 7 days
    var payload = {
        id: user.id,
        expire: Date.now() + 1000 * 60 * 60 * 24 * 7,
    };
    //checks if the jwt secret exists
    if (!config_1.default.jwtSecret) {
        // if it exists
        // Pass { session: false } as an option to indicate that sessions are not needed
        throw new Error("JWT Secret not found");
    }
    //creates the token, using the payload and the jwt secret
    const token = jwt_simple_1.default.encode(payload, config_1.default.jwtSecret);
    //returns the token
    return { token: token };
});
exports.loginUser = loginUser;
/*registers a user, takes in an email, username, and password,
calls passport-local-mongoose's register function*/
const registerUser = (email, username, password) => __awaiter(void 0, void 0, void 0, function* () {
    //check if username already exists in the database
    if ((yield user_1.default.findOne({ username: username })) != null) {
        throw new Error("Username already exists");
    }
    //check if email already exists in the database
    if ((yield user_1.default.findOne({ email: email })) != null) {
        throw new Error("Email already exists");
    }
    const user = new user_1.default({
        email: email,
        username: username,
        bio: username + "hasn't set a bio yet.",
        profilePath: "",
    });
    const registeredUser = yield user_1.default.register(user, password);
    return registeredUser;
});
exports.registerUser = registerUser;
//generic update function, will be called by other update functions
//takes in the user id and the fields to update, removes some code duplication
const update = (userId, updateFields) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = yield user_1.default.findOneAndUpdate({ _id: userId }, updateFields, { new: true });
    if (!updatedUser) {
        throw new Error("User not found");
    }
    return { message: "User updated successfully", user: updatedUser };
});
//update a users email
const updateEmail = (userId, email) => __awaiter(void 0, void 0, void 0, function* () {
    const updateFields = { email: email };
    return update(userId, updateFields);
});
exports.updateEmail = updateEmail;
//updates a users username
const updateUsername = (userId, username) => __awaiter(void 0, void 0, void 0, function* () {
    const updateFields = { username: username };
    return update(userId, updateFields);
});
exports.updateUsername = updateUsername;
//updates a users bio
const updateBio = (userId, bio) => __awaiter(void 0, void 0, void 0, function* () {
    const updateFields = { bio: bio };
    return update(userId, updateFields);
});
exports.updateBio = updateBio;
//updates a users profile picture path
const updateProfilePath = (userId, profilePath) => __awaiter(void 0, void 0, void 0, function* () {
    const updateFields = { profilePath: profilePath };
    return update(userId, updateFields);
});
exports.updateProfilePath = updateProfilePath;
//updates a users password
//doesnt work rn, .changepassword doesnt work llike it should,
//at least being called the way it is, needs to be fixed
const updatePassword = (userId, oldPassword, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findById(userId).exec();
    if (!user) {
        throw new Error("User not found");
    }
    return new Promise((resolve, reject) => {
        user.changePassword(oldPassword, newPassword, (err) => {
            if (err) {
                if (err.name === "IncorrectPasswordError") {
                    reject(new Error("Incorrect password"));
                }
                else {
                    reject(new Error("Error updating password"));
                }
            }
            else {
                resolve({ message: "Password updated" });
            }
        });
    });
});
exports.updatePassword = updatePassword;
//attempted to refactor the code to use async/await, but it was not working, so I left the original code in place
