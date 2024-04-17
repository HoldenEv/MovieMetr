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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllMoviePeople = exports.getAllPersonMovies = exports.popularMovies = exports.nowPlaying = exports.searchTvShows = exports.personById = exports.searchByPeople = exports.movieById = exports.searchMovies = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
//access token is current method of authentication
const apiAccessToken = process.env.ACCESSTOKEN;
//key can be used inline of http request, couldnt get it to work though
const apiKey = process.env.APIKEY;
//search for movies given a search string, currently returns id, title, image, and summary
const searchMovies = (searchString, page) => __awaiter(void 0, void 0, void 0, function* () {
    /* configure url for TMDB movie search URL */
    const url = "https://api.themoviedb.org/3/search/movie?api_key=" +
        apiKey +
        "&query=" +
        searchString +
        "&page=" +
        page;
    const options = {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + apiAccessToken,
        },
    };
    try {
        console.log(url);
        /* make GET request to the configured url */
        const response = yield axios_1.default.get(url, options);
        /* map movie results data to our own array */
        const data = response.data.results.map((movie) => ({
            id: movie.id,
            title: movie.title,
            original_title: movie.original_title,
            year: movie.release_date.slice(0, 4),
            image: movie.poster_path,
            summary: movie.overview,
        }));
        /* store page and result info */
        const page = response.data.page;
        const total_pages = response.data.total_pages;
        const total_results = response.data.total_results;
        /* return page, result info, movie list for response */
        const res = {
            page,
            total_pages,
            total_results,
            data,
        };
        return res;
    }
    catch (error) {
        throw new Error("Error searching movies: " + error);
    }
});
exports.searchMovies = searchMovies;
//searchByActor returns a list of actors and their information
const searchByPeople = (searchString, page) => __awaiter(void 0, void 0, void 0, function* () {
    /* configure url for TMDB person search */
    const url = "https://api.themoviedb.org/3/search/person?api_key=" +
        apiKey +
        "&query=" +
        searchString +
        "&page=" +
        page;
    const options = {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + apiAccessToken,
        },
    };
    try {
        /* make GET request to the configured url */
        const response = yield axios_1.default.get(url, options);
        /* map people results data to our own array */
        const data = response.data.results.map((person) => ({
            id: person.id,
            name: person.name,
            image: person.profile_path,
        }));
        /* store page and result info */
        const page = response.data.page;
        const total_pages = response.data.total_pages;
        const total_results = response.data.total_results;
        /* return page, result info, movie list for response */
        const res = {
            page,
            total_pages,
            total_results,
            data,
        };
        return res;
    }
    catch (error) {
        throw new Error("Error searching people: " + error);
    }
});
exports.searchByPeople = searchByPeople;
//searchTvShows given a searchString returns a list of tv shows and
//their information filtered by a map
const searchTvShows = (searchString, page) => __awaiter(void 0, void 0, void 0, function* () {
    /* configure url for TMDB show search */
    const url = "https://api.themoviedb.org/3/search/tv?api_key=" +
        apiKey +
        "&query=" +
        searchString +
        "&page=" +
        page;
    const options = {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + apiAccessToken,
        },
    };
    try {
        //make GET request to the configured url
        const response = yield axios_1.default.get(url, options);
        // map show results to our own array
        const data = response.data.results.map((show) => ({
            id: show.id,
            name: show.name,
            image: show.poster_path,
            summary: show.overview,
            startdate: show.first_air_date,
        }));
        // store page and result info
        const page = response.data.page;
        const total_pages = response.data.total_pages;
        const total_results = response.data.total_results;
        /* return page, result info, movie list for response */
        const res = {
            page,
            total_pages,
            total_results,
            data,
        };
        return res;
    }
    catch (error) {
        throw new Error("Error searching shows: " + error);
    }
});
exports.searchTvShows = searchTvShows;
/*
    Returns details for movie given a TMDB id, including cast info.
*/
const movieById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const url = "https://api.themoviedb.org/3/movie/" +
        id +
        "?api_key=" +
        apiKey +
        "&append_to_response=credits";
    const options = {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + apiAccessToken,
        },
    };
    try {
        const response = yield axios_1.default.get(url, options);
        //just returns all data for now, decide what to do with it later
        return response.data;
    }
    catch (error) {
        console.error("Error searching for movie details", error);
        throw error;
    }
});
exports.movieById = movieById;
//personById returns all data for a person by id
const personById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const url = "https://api.themoviedb.org/3/person/" + id + "?api_key=" + apiKey;
    const options = {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + apiAccessToken,
        },
    };
    try {
        const response = yield axios_1.default.get(url, options);
        //just returns all data for now, decide what to do with it later
        return response.data;
    }
    catch (error) {
        console.error("Error searching for person details", error);
        throw error;
    }
});
exports.personById = personById;
//nowPlaying returns a list of movies currently playing in theaters
const nowPlaying = () => __awaiter(void 0, void 0, void 0, function* () {
    const url = "https://api.themoviedb.org/3/movie/now_playing?api_key=" + apiKey;
    const options = {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + apiAccessToken,
        },
    };
    try {
        const response = yield axios_1.default.get(url, options);
        //can edit this function to return different data if needed
        const movies = response.data.results.map((movie) => ({
            id: movie.id,
            title: movie.title,
            image: movie.poster_path,
            summary: movie.overview,
        }));
        return movies;
    }
    catch (error) {
        console.error("Error searching movies", error);
        throw error;
    }
});
exports.nowPlaying = nowPlaying;
//popularMovies returns a list of popular movies from TMDB
const popularMovies = () => __awaiter(void 0, void 0, void 0, function* () {
    const url = "https://api.themoviedb.org/3/movie/popular?api_key=" + apiKey;
    const options = {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + apiAccessToken,
        },
    };
    try {
        const response = yield axios_1.default.get(url, options);
        //can edit this function to return different data if needed
        const movies = response.data.results.map((movie) => ({
            id: movie.id,
            title: movie.title,
            image: movie.poster_path,
            summary: movie.overview,
        }));
        return movies;
    }
    catch (error) {
        console.error("Error searching movies", error);
        throw error;
    }
});
exports.popularMovies = popularMovies;
//getAllPersonMovies returns a list of all movies for a person by id
// use this on actor page to display all movies they have been in
//upon click of "see all movies" button... should query api
//because of many less popular movies that may not be in our database
const getAllPersonMovies = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const url = "https://api.themoviedb.org/3/person/" +
        id +
        "/movie_credits?api_key=" +
        apiKey;
    const options = {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + apiAccessToken,
        },
    };
    try {
        const response = yield axios_1.default.get(url, options);
        //returns all movies for now the person was in, in the form of cast objects
        //not quite the same as the movie objects returned by the searchMovies function
        return response.data;
    }
    catch (error) {
        console.error("Error searching for person details", error);
        throw error;
    }
});
exports.getAllPersonMovies = getAllPersonMovies;
//getAllMoviePeople gets all people in a movie by id whos known_for_department is acting,directing,production,wrting
//use this for now to trigger the database entry for all people whne a movie is added
//Called by addMovie function in movieController
const getAllMoviePeople = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const url = "https://api.themoviedb.org/3/movie/" + id + "/credits?api_key=" + apiKey;
    const options = {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + apiAccessToken,
        },
    };
    try {
        const response = yield axios_1.default.get(url, options);
        //filter by department being acting, wrting, directing, production
        const people = response.data.cast.filter((person) => {
            return (person.known_for_department === "Acting" ||
                person.known_for_department === "Directing" ||
                person.known_for_department === "Production" ||
                person.known_for_department === "Writing");
        });
        return people;
    }
    catch (error) {
        console.error("Error searching for person details", error);
        throw error;
    }
});
exports.getAllMoviePeople = getAllMoviePeople;
