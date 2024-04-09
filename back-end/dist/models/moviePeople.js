"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//mongoose schema to map movie_id's to a person's id,
//allowing for querying all movies a person is in, and all people in a movie,
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const moviePeopleSchema = new Schema({
    movie_id: {
        type: String,
        required: true,
        ref: "Movie",
    },
    person_id: {
        type: String,
        required: true,
        ref: "Person",
    },
    //so we can also specify the department of the person in the movie, when querying all people in a movie
    department: {
        type: String,
        required: true,
    },
});
const MoviePeople = mongoose_1.default.model("MoviePeople", moviePeopleSchema);
exports.default = MoviePeople;
