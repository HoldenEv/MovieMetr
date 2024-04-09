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
const genreController_1 = require("../../controllers/genreController");
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
//tests add and get genre functions
test("addGenre and getGenre", () => __awaiter(void 0, void 0, void 0, function* () {
    const genreId = "1";
    const genreName = "Boring Movie";
    const add = yield (0, genreController_1.addGenre)(genreId, genreName);
    const result = yield (0, genreController_1.getGenre)(genreId);
    expect(result.name).toBe(genreName);
    expect(result._id).toBe(genreId);
}));
//tests deleet genre function
test("deleteGenre", () => __awaiter(void 0, void 0, void 0, function* () {
    const genreId = "1";
    yield (0, genreController_1.deleteGenre)(genreId);
    const result = yield (0, genreController_1.getGenre)(genreId);
    expect(result).toBe(null);
}));
//tests add movie genre function and delete movie genre function
test("addMovieGenres and delete", () => __awaiter(void 0, void 0, void 0, function* () {
    const movieId = "1";
    const genreId = "1";
    yield (0, genreController_1.addMovieGenres)(movieId, genreId);
    const result = yield (0, genreController_1.deleteMovieGenre)(movieId, genreId);
    expect(result).toBe(true);
}));
//tests add a genre that already exists in database, should return null
test("addGenre", () => __awaiter(void 0, void 0, void 0, function* () {
    const genreId = "1";
    const genreName = "Boring Movie";
    const result = yield (0, genreController_1.addGenre)(genreId, genreName);
    const result2 = yield (0, genreController_1.addGenre)(genreId, genreName);
    expect(result2).toBe(null);
}));
