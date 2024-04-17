import User from "../models/user";
import config from "../config";
import jwt from "jwt-simple";

//responsible for logging in a user, takes in a username and returns a token
//password verificationis not yet handled
const loginUser = async (username: string,password:string) => {
  console.log("usuername: ", username)
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
    bio:username+ " hasn't set a bio yet.",
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

//update all user info except, password
const updateUser = async (userId: string, email: string, username: string, bio: string, profilePath: string) => {
  const user = await User.findById(userId).exec();
  if (!user) {
    throw new Error("User not found");
  }
  user.email = email;
  user.username = username;
  user.bio = bio;
  user.profilePath = profilePath;
  return user.save();
}


//gets user all user info by user id
const getUser = async (userId: string) => {
  const user = await User.findById(userId).exec();
  if (!user) {
    throw new Error("User not found");
  }
  return user;
}


//FOLLOWING AND FOLLOWERS FUNCTIONS
//will need to modify the followers in user model and 
//some controller functions to allow for the ability for a user to follow person objects

//could create a object or add a check to see if the id is a userId and personId
//then call the correct function to bring up either a user page or person page
//like how it is done with spotify followers and following

/**
 * Follow a user, given the user id of the user and the user id of the user to follow
 * Also adds the user to the followee's followers list
 * @param userId the user id of the follower
 * @param followId the user id of the user to follow
 * @returns the updated user object
 * 
 */
const followUser = async (userId: string, followId: string) => {
  const user = await User.findById(userId).exec();
  const follow = await User.findById(followId).exec();
  //one error for both users for now
  if(!user || !follow){
    throw new Error("User not found");
  }
  //check if user is already following the followee
  //may need to adjust because of the way following is stored as object ids
  //not strings
  if(user.following.includes(followId)){
    throw new Error("Already following user");
  }
  user.following.push(followId);
  follow.followers.push(userId);
  await user.save();
  await follow.save();
  return user;
} 

/**
 * Unfollow a user, given the user id of the user and the user id of the user to unfollow
 * Also removes the user from the followee's followers list
 * @param userId the user id of the follower
 * @param followId the user id of the user to unfollow
 * @returns the updated user object
 * 
 */
const unfollowUser = async (userId: string, followId: string) => {
  const user = await User.findById(userId).exec();
  const follow = await User.findById(followId).exec();
  //one error for both
  if(!user || !follow){
    throw new Error("User not found");
  }
  //check if user is already following the followee
  //may need to adjust because of the way following is stored as object ids
  if(!user.following.includes(followId)){
    throw new Error("Not following user");
  }
  //remove the followee from the user's following list and the user from the followee's followers list
  user.following = user.following.filter((id: string) => id !== followId);
  follow.followers = follow.followers.filter((id: string) => id !== userId);
  await user.save();
  await follow.save();
  return user;
}

/**
 * Get all users that a user is following
 * @param userId the user id of the user
 * @returns an array of user objects
 */
const getFollowing = async (userId: string) => {
  try{
    const user = await User.findById(userId).exec();
    if(!user){
      throw new Error("User not found");
    }
    //get all users that the user is following
    //may need to adjust because of the way following is stored
    const following = await User.find({ _id: { $in: user.following } }).exec();
    return following;
  } catch (error) {
    console.error("Error getting user's following list", error);
    return null;
  }
}

/**
 * Get all users that are following a user
 * @param userId the user id of the user
 * @returns an array of user objects
 */
const getFollowers = async (userId: string) => {
  try{
    const user = await User.findById(userId).exec();
    if(!user){
      throw new Error("User not found");
    }
    //get all users that are following the user
    //may need to adjust because of the way followers is stored
    const followers = await User.find({ _id: { $in: user.followers } }).exec();
    return followers;
  } catch (error) {
    console.error("Error getting users followers list", error);
    return null;
  }
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
  updateUser,
  followUser,
  unfollowUser,
  getFollowing,
  getFollowers,
};
//attempted to refactor the code to use async/await, but it was not working, so I left the original code in place
