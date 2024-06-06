import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
let mongoServer: MongoMemoryServer;
import Movie from "../../models/movies";
import User from "../../models/user";
import List from "../../models/lists";

jest.mock("../../controllers/movieController", () => ({
  addMovie: jest.fn(),
}));

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});
