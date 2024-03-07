import User from "../../models/user";
jest.mock("../../models/user");
const mockedUser = User as jest.Mocked<typeof User>;

import jwt from "jwt-simple";
import accountController from "../../controllers/accountController";

/*
"describe" breaks your test suite into components
"it" is where the actual testing is occuring 
*/
describe("accountController", () => {
  describe("login-route", () => {
    it("should return a JWT token when a user is found", async () => {
      // fake user
      const mockUser = { id: "123", username: "testuser" };
      mockedUser.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockUser),
      } as any);
      // We don't need a real token for testing nor do we want one for security reasons so we can create a fake on
      jwt.encode = jest.fn().mockReturnValue("mocked-token");

      const req = { body: { username: "testuser" } };
      const res = { json: jest.fn() };

      await accountController.login(req, res);

      expect(res.json).toHaveBeenCalledWith({ token: "mocked-token" });
    });

    it("should return a 404 status when a user is not found", async () => {
      mockedUser.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      } as any);

      const req = { body: { username: "nonexistentuser" } };
      // jest.fn() is used to create a mock function
      // mockReturnThis() configured the mock function to return this which is a mock function itself
      // we can use this for method chaining to help us mock objects like status, etc.
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await accountController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
    });

    it("should return a 500 status when an error occurs", async () => {
      // mockedUser.findOne.mockImplementation(() => {
      //   throw new Error("mock error");
      // });
      mockedUser.findOne.mockReturnValue({
        exec: jest.fn().mockImplementation(() => {
          throw new Error("Mock error");
        }),
      } as any);

      const req = { body: { username: "testuser" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await accountController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal Server Error",
      });
    });
  });
});
