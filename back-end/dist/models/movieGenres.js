"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const movieGenresSchema = new Schema({
    movie_id: {
        type: String,
        required: true,
        ref: "Movie",
    },
    genre_id: {
        type: String,
        required: true,
        ref: "Genre",
    },
});
const MovieGenres = mongoose_1.default.model("MovieGenres", movieGenresSchema);
exports.default = MovieGenres;
