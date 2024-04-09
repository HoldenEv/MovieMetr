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
const reviewsController_1 = require("../../controllers/reviewsController");
const mongoose = require("mongoose");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
//connect to the db before all tests
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose.connect(process.env.URI);
}));
//disconnect from the db after all tests
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose.disconnect();
}));
// test that a review can succesfully be added and deleted
test("Add review and delete", () => __awaiter(void 0, void 0, void 0, function* () {
    const testMovieId = "634492";
    const testUserId = "1234";
    const testReviewString = "This is a test review string.";
    const testRating = "8";
    const addResult = yield (0, reviewsController_1.addReview)(testMovieId, testUserId, testReviewString, testRating);
    // addReview should add to database and return the object on success
    expect(addResult).toMatchObject({
        movie_id: testMovieId,
        user_id: testUserId,
        review: testReviewString,
        rating: testRating,
    });
    // test delete in same function for now so we can keep the database clean
    const deleteResult = yield (0, reviewsController_1.deleteReview)(addResult._id);
    expect(deleteResult).toBe(true);
}));
// adding a review for a non-existent film should return null
test("Add review, movie not in database", () => __awaiter(void 0, void 0, void 0, function* () {
    const testMovieId = "This ID is not in the DB";
    const testUserId = "12985";
    const testReviewString = "This is a test review string.";
    const testRating = "10";
    const result = yield (0, reviewsController_1.addReview)(testMovieId, testUserId, testReviewString, testRating);
    expect(result).toBe(null);
}));
test("delete non-existent review", () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, reviewsController_1.deleteReview)("blahblahblah");
    expect(result).toBe(false);
}));
test("get review", () => __awaiter(void 0, void 0, void 0, function* () {
    const testMovieId = "634492";
    const testUserId = "12985";
    const testReviewString = "This is a test review string.";
    const testRating = "10";
    const addResult = yield (0, reviewsController_1.addReview)(testMovieId, testUserId, testReviewString, testRating);
    const result = yield (0, reviewsController_1.getReview)(addResult._id);
    expect(result).toMatchObject({
        movie_id: testMovieId,
        user_id: testUserId,
        review: testReviewString,
        rating: testRating,
    });
    yield (0, reviewsController_1.deleteReview)(addResult._id);
}));
test("get review, review DNE", () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, reviewsController_1.getReview)("This ID DNE");
    expect(result).toBe(null);
}));
test("get movie reviews, get user reviews", () => __awaiter(void 0, void 0, void 0, function* () {
    const testMovieId = "634492";
    const testUserId = "12985";
    const testReviewString = "This is a test review string.";
    const testRating = "10";
    const addResult = yield (0, reviewsController_1.addReview)(testMovieId, testUserId, testReviewString, testRating);
    const movieResult = yield (0, reviewsController_1.getMovieReviews)("634492");
    expect(movieResult).toEqual(expect.arrayContaining([
        expect.objectContaining({
            movie_id: testMovieId,
            user_id: testUserId,
            review: testReviewString,
            rating: testRating,
        }),
    ]));
    const userResult = yield (0, reviewsController_1.getUserReviews)("12985");
    expect(userResult).toEqual(expect.arrayContaining([
        expect.objectContaining({
            movie_id: testMovieId,
            user_id: testUserId,
            review: testReviewString,
            rating: testRating,
        }),
    ]));
}));
