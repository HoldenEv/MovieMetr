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
exports.deleteMovie = exports.getMovie = exports.addPersonMovies = exports.addMovie = void 0;
const movies_1 = __importDefault(require("../models/movies"));
const movieGenres_1 = __importDefault(require("../models/movieGenres"));
const personController_1 = require("./personController");
const genreController_1 = require("./genreController");
const apiPuller_1 = require("../middleware/apiPuller");
/*when given a movie ID, query the TMDB API for the movie details
then add the movie to the database, including all related fields
This function could have the genre operations split into seperate functions,
especially if there are other instances they may need to be used,
just cant think of any rn*/
const addMovie = (movieId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //checks if movie is already in the database
        if ((yield movies_1.default.findOne({ _id: movieId })) != null) {
            console.error("Error adding movie: Movie already in database");
            return null;
        }
        //grabs all movie details from the API
        const movie = yield (0, apiPuller_1.movieById)(movieId);
        const newMovie = new movies_1.default({
            _id: movie.id,
            title: movie.title,
            year: movie.release_date,
            summary: movie.overview,
            image_path: movie.poster_path,
        });
        //add the movie to the database
        yield newMovie.save();
        //add all people(actors, directors, producers,writers) to the database
        //defined in personController
        (0, personController_1.addAllMoviePeople)(movieId);
        /*add genres to genre collection if not already there
            calls addGenre from genreController*/
        for (let genre of movie.genres) {
            (0, genreController_1.addGenre)(genre.id, genre.name);
        }
        //add genre-movie pairs to movieGenres collection
        for (let genre of movie.genres) {
            (0, genreController_1.addMovieGenres)(movieId, genre.id);
        }
        return newMovie;
    }
    catch (error) {
        console.error("Error adding movie", error);
        return null;
    }
});
exports.addMovie = addMovie;
//adds all movies by a given person to the database
const addPersonMovies = (personId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //query the api for all movies related to the person
        const result = yield (0, apiPuller_1.getAllPersonMovies)(personId);
        //think we need this libe because AllPersonMovies returns a list of movies as cast
        //objects by calling people/moviecredits, so we need to grab the cast field from the result
        const movies = result.cast;
        //add each movie to the database
        for (let movie of movies) {
            addMovie(movie.id);
        }
    }
    catch (error) {
        console.error("Error adding movies", error);
    }
});
exports.addPersonMovies = addPersonMovies;
//gets a movie from the database by its id
const getMovie = (movieId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movie = yield movies_1.default.findOne({ _id: movieId });
        return movie;
    }
    catch (error) {
        console.error("Error getting movie", error);
        return null;
    }
});
exports.getMovie = getMovie;
/*delets a movie from the database by its id
also deletes all genre-movie pairs for the movie*/
const deleteMovie = (movieId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield movies_1.default.deleteOne({ _id: movieId });
        yield movieGenres_1.default.deleteMany({ movie_id: movieId });
        return true;
    }
    catch (error) {
        console.error("Error deleting movie", error);
        return false;
    }
});
exports.deleteMovie = deleteMovie;
