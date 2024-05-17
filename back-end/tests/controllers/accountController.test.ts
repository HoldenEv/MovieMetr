// import {
//   loginUser,
//   registerUser,
//   updateEmail,
//   updateUsername,
//   updateBio,
//   updatePassword,
//   updateProfilePath,
// } from "../../controllers/accountController";
// const mongoose = require("mongoose");
// import * as dotenv from "dotenv";
// dotenv.config();
// //connect to the db before all tests
// beforeAll(async () => {
//   await mongoose.connect(process.env.URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
// });

// //disconnect from the db after all tests
// afterAll(async () => {
//   await mongoose.disconnect();
// });

// test("loginUser - Correct username and password", async () => {
//   const username = "testName";
//   const password = "password";

//   const result = await loginUser(username, password);

//   // Assert that a token is returned
//   expect(result.token).toBeDefined();
// });

// test("loginUser - Incorrect username", async () => {
//   // Use a non-existent username
//   const username = "nonExistentUser";
//   const password = "testPassword";

//   try {
//     await loginUser(username, password);
//     fail("Expected loginUser to throw an error for incorrect username");
//   } catch (error: any) {
//     // Assert that the error message is "Username not found"
//     expect(error.message).toBe("Username not found");
//   }
// });

// test("loginUser - Incorrect password", async () => {
//   // Use a correct username but incorrect password
//   const username = "testName";
//   const password = "incorrectPassword";

//   // Call the loginUser function
//   try {
//     await loginUser(username, password);
//     // If the function does not throw an error, fail the test
//     fail("Expected loginUser to throw an error for incorrect password");
//   } catch (error: any) {
//     // Assert that the error message is "Incorrect password"
//     expect(error.message).toBe("Incorrect password");
//   }
// });

// test("registerUser - Successful registration", async () => {
//   const email = "test@example.com";
//   const username = "testUser";
//   const password = "testPassword";

//   const result = await registerUser(email, username, password);

//   // Assert that the registered user object is returned
//   expect(result).toBeDefined();
//   expect(result.email).toBe(email);
//   expect(result.username).toBe(username);
// });

// test("registerUser - Username already exists", async () => {
//   // Use a username that already exists in the database
//   const email = "new@example.com";
//   const existingUsername = "testName";
//   const password = "testPassword";

//   try {
//     await registerUser(email, existingUsername, password);
//     fail("Expected registerUser to throw an error for existing username");
//   } catch (error: any) {
//     // Assert that the error message is "Username already exists"
//     expect(error.message).toBe("Username already exists");
//   }
// });

// test("registerUser - Email already exists", async () => {
//   // Use an email that already exists in the database
//   const existingEmail = "test@example.com";
//   const username = "newUser";
//   const password = "testPassword";

//   try {
//     await registerUser(existingEmail, username, password);
//     fail("Expected registerUser to throw an error for existing email");
//   } catch (error: any) {
//     // Assert that the error message is "Email already exists"
//     expect(error.message).toBe("Email already exists");
//   }
// });

// test("updateEmail - Successful email update", async () => {
//   //const userId = new mongoose.Types.ObjectId();
//   const userId = "65fbaf1722d131a9dea2bb8e";
//   const newEmail = "newemail@example.com";

//   const result = await updateEmail(userId, newEmail);

//   // Assert that the message indicates successful update
//   expect(result.message).toBe("User updated successfully");
//   // Assert that the updated user object is returned
//   expect(result.user.email).toBe(newEmail);
// });

// test("updateUsername - Successful username update", async () => {
//   //const userId = new mongoose.Types.ObjectId();
//   const userId = "65fbaf1722d131a9dea2bb8e";
//   const newUsername = "newUsername";

//   const result = await updateUsername(userId, newUsername);

//   // Assert that the message indicates successful update
//   expect(result.message).toBe("User updated successfully");
//   // Assert that the updated user object is returned
//   expect(result.user.username).toBe(newUsername);
// });

// test("updateBio - Successful bio update", async () => {
//   const userId = "65fbaf1722d131a9dea2bb8e";
//   const newBio = "New bio for testing";

//   const result = await updateBio(userId, newBio);

//   // Assert that the message indicates successful update
//   expect(result.message).toBe("User updated successfully");
//   // Assert that the updated user object is returned
//   expect(result.user.bio).toBe(newBio);
// });

// test("updateProfilePath - Successful profile path update", async () => {
//   const userId = "65fbaf1722d131a9dea2bb8e";
//   const newProfilePath = "/path/to/new/profile.jpg";

//   const result = await updateProfilePath(userId, newProfilePath);

//   // Assert that the message indicates successful update
//   expect(result.message).toBe("User updated successfully");
//   // Assert that the updated user object is returned
//   expect(result.user.profilePath).toBe(newProfilePath);
// });

import {
  loginUser,
  registerUser,
  updateEmail,
  updateUsername,
  updateBio,
  updatePassword,
  updateProfilePath,
} from "../../controllers/accountController";
import mockingoose from 'mockingoose';
import User from '../../models/user'; // Assuming User is your Mongoose model
const mongoose = require("mongoose");
import * as dotenv from "dotenv";
dotenv.config();

beforeEach(() => {
  mockingoose.resetAll();
});

// Mocking the `findOne` and `save` functions for User model
test("loginUser - Correct username and password", async () => {
  const username = "testName";
  const password = "password";
  const mockUser = {
    username: username,
    password: password, // Ideally, this should be a hashed password
    _id: "60c72b2f5f1b2c6d88f8a37b", // example ObjectId
  };

  mockingoose(User).toReturn(mockUser, 'findOne');

  const result = await loginUser(username, password);

  // Assert that a token is returned
  expect(result.token).toBeDefined();
});

test("loginUser - Incorrect username", async () => {
  const username = "nonExistentUser";
  const password = "testPassword";

  mockingoose(User).toReturn(null, 'findOne');

  try {
    await loginUser(username, password);
    fail("Expected loginUser to throw an error for incorrect username");
  } catch (error: any) {
    // Assert that the error message is "Username not found"
    expect(error.message).toBe("Username not found");
  }
});

test("loginUser - Incorrect password", async () => {
  const username = "testName";
  const password = "incorrectPassword";
  const mockUser = {
    username: username,
    password: "correctPassword", // Example hashed password
    _id: "60c72b2f5f1b2c6d88f8a37b",
  };

  mockingoose(User).toReturn(mockUser, 'findOne');

  try {
    await loginUser(username, password);
    fail("Expected loginUser to throw an error for incorrect password");
  } catch (error: any) {
    // Assert that the error message is "Incorrect password"
    expect(error.message).toBe("Incorrect password");
  }
});

test("registerUser - Successful registration", async () => {
  const email = "test@example.com";
  const username = "testUser";
  const password = "testPassword";

  mockingoose(User).toReturn(null, 'findOne'); // No user with this email or username
  mockingoose(User).toReturn({ email, username, password }, 'save');

  const result = await registerUser(email, username, password);

  // Assert that the registered user object is returned
  expect(result).toBeDefined();
  expect(result.email).toBe(email);
  expect(result.username).toBe(username);
});

test("registerUser - Username already exists", async () => {
  const email = "new@example.com";
  const existingUsername = "testName";
  const password = "testPassword";

  const mockUser = {
    username: existingUsername,
    email: "existing@example.com",
    _id: "66202dc3c52f35252988da07",
  };

  mockingoose(User).toReturn(mockUser, 'findOne');

  try {
    await registerUser(email, existingUsername, password);
    fail("Expected registerUser to throw an error for existing username");
  } catch (error: any) {
    // Assert that the error message is "Username already exists"
    expect(error.message).toBe("Username already exists");
  }
});

test("registerUser - Email already exists", async () => {
  const existingEmail = "test@example.com";
  const username = "newUser";
  const password = "testPassword";

  const mockUser = {
    username: "existingUser",
    email: existingEmail,
    _id: "60c72b2f5f1b2c6d88f8a37b",
  };

  mockingoose(User).toReturn(mockUser, 'findOne');

  try {
    await registerUser(existingEmail, username, password);
    fail("Expected registerUser to throw an error for existing email");
  } catch (error: any) {
    // Assert that the error message is "Email already exists"
    expect(error.message).toBe("Email already exists");
  }
});

// test("updateEmail - Successful email update", async () => {
//   const userId = "65fbaf1722d131a9dea2bb8e";
//   const newEmail = "newemail@example.com";
//   const mockUser = {
//     _id: userId,
//     email: "oldemail@example.com",
//     username: "testUser",
//     save: jest.fn().mockResolvedValue({
//       _id: userId,
//       email: newEmail,
//       username: "testUser",
//     }),
//   };

//   mockingoose(User).toReturn(mockUser, 'findOneAndUpdate');

//   const result = await updateEmail(userId, newEmail);

//   // Assert that the message indicates successful update
//   expect(result.message).toBe("User updated successfully");
//   // Assert that the updated user object is returned
//   expect(result.user.email
