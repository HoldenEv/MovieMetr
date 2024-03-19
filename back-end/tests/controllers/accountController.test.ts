import { loginUser }from "../../controllers/accountController";
const mongoose = require("mongoose");
import * as dotenv from "dotenv";
dotenv.config();
//connect to the db before all tests
beforeAll(async () => {
    await mongoose.connect(process.env.URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

//disconnect from the db after all tests
afterAll(async () => {
    await mongoose.disconnect();
});

test("loginUser - Correct username and password", async () => {
  const username = "testName";
  const password = "password";

  const result = await loginUser(username, password);

  // Assert that a token is returned
  expect(result.token).toBeDefined();
});

test("loginUser - Incorrect username", async () => {

  // Use a non-existent username
  const username = "nonExistentUser";
  const password = "testPassword";

  try {
    await loginUser(username, password);
    fail("Expected loginUser to throw an error for incorrect username");
  } catch (error : any) {
    // Assert that the error message is "Username not found"
    expect(error.message).toBe("Username not found");
  }
});

test("loginUser - Incorrect password", async () => {

  // Use a correct username but incorrect password
  const username = "testName";
  const password = "incorrectPassword";

  // Call the loginUser function
  try {
    await loginUser(username, password);
    // If the function does not throw an error, fail the test
    fail("Expected loginUser to throw an error for incorrect password");
  } catch (error : any) {
    // Assert that the error message is "Incorrect password"
    expect(error.message).toBe("Incorrect password");
  }
});
