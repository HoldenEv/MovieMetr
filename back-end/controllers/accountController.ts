import User from "../models/user";
import config from "../config";
import jwt from "jwt-simple";

//responsible for logging in a user, takes in a username and returns a token
//password verificationis not yet handled
const loginUser = async (username: string,password:string) => {
  const user = await User.findOne({ username: username }).exec();
  if (!user) {
    throw new Error("Username not found");
  }

  //handles password verification
  const isAuthenticated = await new Promise((resolve, reject) => {
    user.authenticate(password, (err,result) => {
      if(err){
        reject(err);
      }else if(!result){
        reject(new Error("Incorrect password"));
      }else{
        resolve(true);
      }
    });
  });

  if(!isAuthenticated){
    throw new Error("Incorrect password");
  }

  //creates a payload with the user id and an expiration date of 7 days
  var payload = {
    id: user.id,
    expire: Date.now() + 1000 * 60 * 60 * 24 * 7,
  };
//checks if the jwt secret exists
  if (!config.jwtSecret) {
    // if it exists
    // Pass { session: false } as an option to indicate that sessions are not needed
    throw new Error("JWT Secret not found");
  }
//creates the token, using the payload and the jwt secret
  const token = jwt.encode(payload, config.jwtSecret);
  //returns the token
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
    bio:username+ "hasn't set a bio yet.",
    profilePath:"",
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
const updateEmail = async (userId: any, email: string) => {
  const updateFields = { email: email };
  return update(userId, updateFields);
};

//updates a users username
const updateUsername = async (userId: any, username: string) => {
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

//updates a users password
//doesnt work rn, .changepassword doesnt work llike it should,
//at least being called the way it is, needs to be fixed
const updatePassword = async (userId: string, oldPassword: string,newPassword: string ) => {
  const user = await User.findById(userId).exec();
  if (!user) {
    throw new Error("User not found");
  }
  return new Promise((resolve, reject) => {
    user.changePassword(oldPassword, newPassword, (err) => {
      if(err){
        if(err.name === "IncorrectPasswordError"){
          reject(new Error("Incorrect password"));
        } else {
          reject(new Error("Error updating password"));
        }
      }else{
        resolve({message: "Password updated"});
      }
    });
  });
};

//gets user all user info by user id
const getUser = async (userId: string) => {
  const user = await User.findById(userId).exec();
  if (!user) {
    throw new Error("User not found");
  }
  return user;
}

  

export {
  loginUser,
  registerUser,
  updateEmail,
  updateUsername,
  updateBio,
  updateProfilePath,
  updatePassword,
  getUser,
};
//attempted to refactor the code to use async/await, but it was not working, so I left the original code in place
