"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReview = exports.getUserReviews = exports.getMovieReviews = exports.deleteReview = exports.addReview = void 0;
const reviews_1 = __importDefault(require("../models/reviews"));
const movies_1 = __importDefault(require("../models/movies"));
//adds a new review to the database, takes in the movie id, user id, review text, and rating
const addReview = (movieId, userId, reviewString, rating) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if ((yield movies_1.default.findOne({ _id: movieId })) == null) {
            console.error("Error adding review: Movie not in dtabase");
            return null;
        }
        const newReview = new reviews_1.default({
            movie_id: movieId,
            user_id: userId,
            review: reviewString,
            rating: rating,
            time: Date.now(),
        });
        yield newReview.save();
        return newReview;
    }
    catch (error) {
        console.error("Error adding review", error);
        return null;
    }
});
exports.addReview = addReview;
//deletes a review from the database by its id
const deleteReview = (reviewId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield reviews_1.default.deleteOne({ _id: reviewId });
        return true;
    }
    catch (error) {
        console.error("Error deleting review", error);
        return false;
    }
});
exports.deleteReview = deleteReview;
//gets a review by its id from the database
const getReview = (reviewId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const review = yield reviews_1.default.findOne({ _id: reviewId });
        return review;
    }
    catch (error) {
        console.error("Error getting review", error);
        return null;
    }
});
exports.getReview = getReview;
//returns all reviews objects for a movie by its id
const getMovieReviews = (movieId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviews = yield reviews_1.default.find({ movie_id: movieId });
        return reviews;
    }
    catch (error) {
        console.error("Error getting reviews", error);
        return null;
    }
});
exports.getMovieReviews = getMovieReviews;
//returns all reviews objects for a user by their id
const getUserReviews = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviews = yield reviews_1.default.find({ user_id: userId });
        return reviews;
    }
    catch (error) {
        console.error("Error getting reviews", error);
        return null;
    }
});
exports.getUserReviews = getUserReviews;
