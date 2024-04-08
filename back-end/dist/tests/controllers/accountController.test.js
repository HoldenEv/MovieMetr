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
Object.defineProperty(exports, "__esModule", { value: true });
const accountController_1 = require("../../controllers/accountController");
const mongoose = require("mongoose");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
//connect to the db before all tests
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose.connect(process.env.URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}));
//disconnect from the db after all tests
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose.disconnect();
}));
test("loginUser - Correct username and password", () => __awaiter(void 0, void 0, void 0, function* () {
    const username = "testName";
    const password = "password";
    const result = yield (0, accountController_1.loginUser)(username, password);
    // Assert that a token is returned
    expect(result.token).toBeDefined();
}));
test("loginUser - Incorrect username", () => __awaiter(void 0, void 0, void 0, function* () {
    // Use a non-existent username
    const username = "nonExistentUser";
    const password = "testPassword";
    try {
        yield (0, accountController_1.loginUser)(username, password);
        fail("Expected loginUser to throw an error for incorrect username");
    }
    catch (error) {
        // Assert that the error message is "Username not found"
        expect(error.message).toBe("Username not found");
    }
}));
test("loginUser - Incorrect password", () => __awaiter(void 0, void 0, void 0, function* () {
    // Use a correct username but incorrect password
    const username = "testName";
    const password = "incorrectPassword";
    // Call the loginUser function
    try {
        yield (0, accountController_1.loginUser)(username, password);
        // If the function does not throw an error, fail the test
        fail("Expected loginUser to throw an error for incorrect password");
    }
    catch (error) {
        // Assert that the error message is "Incorrect password"
        expect(error.message).toBe("Incorrect password");
    }
}));
test("registerUser - Successful registration", () => __awaiter(void 0, void 0, void 0, function* () {
    const email = "test@example.com";
    const username = "testUser";
    const password = "testPassword";
    const result = yield (0, accountController_1.registerUser)(email, username, password);
    // Assert that the registered user object is returned
    expect(result).toBeDefined();
    expect(result.email).toBe(email);
    expect(result.username).toBe(username);
}));
test("registerUser - Username already exists", () => __awaiter(void 0, void 0, void 0, function* () {
    // Use a username that already exists in the database
    const email = "new@example.com";
    const existingUsername = "testName";
    const password = "testPassword";
    try {
        yield (0, accountController_1.registerUser)(email, existingUsername, password);
        fail("Expected registerUser to throw an error for existing username");
    }
    catch (error) {
        // Assert that the error message is "Username already exists"
        expect(error.message).toBe("Username already exists");
    }
}));
test("registerUser - Email already exists", () => __awaiter(void 0, void 0, void 0, function* () {
    // Use an email that already exists in the database
    const existingEmail = "test@example.com";
    const username = "newUser";
    const password = "testPassword";
    try {
        yield (0, accountController_1.registerUser)(existingEmail, username, password);
        fail("Expected registerUser to throw an error for existing email");
    }
    catch (error) {
        // Assert that the error message is "Email already exists"
        expect(error.message).toBe("Email already exists");
    }
}));
test("updateEmail - Successful email update", () => __awaiter(void 0, void 0, void 0, function* () {
    //const userId = new mongoose.Types.ObjectId();
    const userId = "65fbaf1722d131a9dea2bb8e";
    const newEmail = "newemail@example.com";
    const result = yield (0, accountController_1.updateEmail)(userId, newEmail);
    // Assert that the message indicates successful update
    expect(result.message).toBe("User updated successfully");
    // Assert that the updated user object is returned
    expect(result.user.email).toBe(newEmail);
}));
test("updateUsername - Successful username update", () => __awaiter(void 0, void 0, void 0, function* () {
    //const userId = new mongoose.Types.ObjectId();
    const userId = "65fbaf1722d131a9dea2bb8e";
    const newUsername = "newUsername";
    const result = yield (0, accountController_1.updateUsername)(userId, newUsername);
    // Assert that the message indicates successful update
    expect(result.message).toBe("User updated successfully");
    // Assert that the updated user object is returned
    expect(result.user.username).toBe(newUsername);
}));
test("updateBio - Successful bio update", () => __awaiter(void 0, void 0, void 0, function* () {
    const userId = "65fbaf1722d131a9dea2bb8e";
    const newBio = "New bio for testing";
    const result = yield (0, accountController_1.updateBio)(userId, newBio);
    // Assert that the message indicates successful update
    expect(result.message).toBe("User updated successfully");
    // Assert that the updated user object is returned
    expect(result.user.bio).toBe(newBio);
}));
test("updateProfilePath - Successful profile path update", () => __awaiter(void 0, void 0, void 0, function* () {
    const userId = "65fbaf1722d131a9dea2bb8e";
    const newProfilePath = "/path/to/new/profile.jpg";
    const result = yield (0, accountController_1.updateProfilePath)(userId, newProfilePath);
    // Assert that the message indicates successful update
    expect(result.message).toBe("User updated successfully");
    // Assert that the updated user object is returned
    expect(result.user.profilePath).toBe(newProfilePath);
}));
