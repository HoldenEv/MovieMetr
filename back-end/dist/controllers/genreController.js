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
exports.deleteMovieGenre = exports.deleteGenre = exports.getGenre = exports.addMovieGenres = exports.addGenre = void 0;
const movieGenres_1 = __importDefault(require("../models/movieGenres"));
const genre_1 = __importDefault(require("../models/genre"));
//adds a genre to the database
const addGenre = (genreId, genreName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingGenre = yield genre_1.default.findOne({ _id: genreId });
        if (!existingGenre) {
            const newGenre = new genre_1.default({
                _id: genreId,
                name: genreName,
            });
            yield newGenre.save();
        }
        else {
            console.error("Error adding genre: Genre already in database");
            return null;
        }
    }
    catch (error) {
        console.error("Error adding genre", error);
    }
});
exports.addGenre = addGenre;
//adds a movie genre pairing to the database
const addMovieGenres = (movieId, genreId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newMovieGenre = new movieGenres_1.default({
            movie_id: movieId,
            genre_id: genreId,
        });
        yield newMovieGenre.save();
    }
    catch (error) {
        console.error("Error adding movie genre", error);
    }
});
exports.addMovieGenres = addMovieGenres;
//gets a genre by its id from the database
const getGenre = (genreId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const genre = yield genre_1.default.findOne({ _id: genreId });
        return genre;
    }
    catch (error) {
        console.error("Error getting genre", error);
        return null;
    }
});
exports.getGenre = getGenre;
//delets a genre from the db by id
const deleteGenre = (genreId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield genre_1.default.deleteOne({ _id: genreId });
        yield movieGenres_1.default.deleteMany({ genre_id: genreId });
        return true;
    }
    catch (error) {
        console.error("Error deleting genre", error);
        return false;
    }
});
exports.deleteGenre = deleteGenre;
//deletes a movie genre from the db by movie id and genre id
const deleteMovieGenre = (movieId, genreId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield movieGenres_1.default.deleteOne({ movie_id: movieId, genre_id: genreId });
        return true;
    }
    catch (error) {
        console.error("Error deleting movie genre", error);
        return false;
    }
});
exports.deleteMovieGenre = deleteMovieGenre;
