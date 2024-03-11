import User from "../models/user";
import config from "../config";
import jwt from "jwt-simple";

//responsible for logging in a user, takes in a username and returns a token
//password verificationis not yet handled
const loginUser = async (username: string) => {
  const user = await User.findOne({ username: username }).exec();
  if (!user) {
    throw new Error("User not found");
  }

  var payload = {
    id: user.id,
    expire: Date.now() + 1000 * 60 * 60 * 24 * 7,
  };

  if (!config.jwtSecret) {
    // if it exists
    // Pass { session: false } as an option to indicate that sessions are not needed
    throw new Error("JWT Secret not found");
  }

  const token = jwt.encode(payload, config.jwtSecret);
  return { token: token };
};

/*registers a user, takes in an email, username, and password, 
calls passport-local-mongoose's register function*/
const registerUser = async (
  email: string,
  username: string,
  password: string,
) => {
  //check if username already exists in the database
  if ((await User.findOne({ username: username })) != null) {
    throw new Error("Username already exists");
  }
  //check if email already exists in the database
  if ((await User.findOne({ email: email })) != null) {
    throw new Error("Email already exists");
  }
  const user = new User({
    email: email,
    username: username,
  });
  const registeredUser = await User.register(user, password);
  return registeredUser;
};

//generic update function, will be called by other update functions
//takes in the user id and the fields to update, removes some code duplication
const update = async (userId: string, updateFields: {}) => {
  const updatedUser = await User.findOneAndUpdate(
    { _id: userId },
    updateFields,
    { new: true },
  );
  if (!updatedUser) {
    throw new Error("User not found");
  }
  return { message: "User updated successfully", user: updatedUser };
};

//update a users email
const updateEmail = async (userId: string, email: string) => {
  const updateFields = { email: email };
  return update(userId, updateFields);
};

//updates a users username
const updateUsername = async (userId: string, username: string) => {
  const updateFields = { username: username };
  return update(userId, updateFields);
};

//updates a users bio
const updateBio = async (userId: string, bio: string) => {
  const updateFields = { bio: bio };
  return update(userId, updateFields);
};

//updates a users profile picture path
const updateProfilePath = async (userId: string, profilePath: string) => {
  const updateFields = { profilePath: profilePath };
  return update(userId, updateFields);
};

export {
  loginUser,
  registerUser,
  updateEmail,
  updateUsername,
  updateBio,
  updateProfilePath,
};
//attempted to refactor the code to use async/await, but it was not working, so I left the original code in place
