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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apiPuller_1 = require("../middleware/apiPuller");
const router = (0, express_1.Router)();
/*
  Search by either: 'movies', 'shows', 'people'. Calls various functions from
  apiPuller.
*/
router.get("/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.query.name;
        const page = req.query.page;
        const category = req.query.category;
        let results = {};
        if (category === "movies") {
            results = yield (0, apiPuller_1.searchMovies)(name, page);
        }
        else if (category === "shows") {
            results = yield (0, apiPuller_1.searchTvShows)(name, page);
        }
        else if (category === "people") {
            results = yield (0, apiPuller_1.searchByPeople)(name, page);
        }
        else {
            throw new Error("invalid category");
        }
        res.json(results);
    }
    catch (error) {
        console.error("Error searching movies", error);
        res.status(500).send("An error occurred while searching.");
    }
}));
/*
  Gets actor details by their TMDB id, calls personById function from apiPuller.
*/
router.get("/people/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const movie = yield (0, apiPuller_1.personById)(id);
        res.json(movie);
    }
    catch (error) {
        console.error("Error getting movie details", error);
        res.status(500).send("Error getting movie details");
    }
}));
/*
  Gets movie details by their TMDB id, calls movieById function from apiPuller.
*/
router.get("/movies/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const movie = yield (0, apiPuller_1.movieById)(id);
        res.json(movie);
    }
    catch (error) {
        console.error("Error getting movie details", error);
        res.status(500).send("Error getting movie details");
    }
}));
/*Below are routes tor return movie lists(popular, now playing, top rated, by genre perhaps,
  have the routes here for testing for now, likely wont need these until a home page is decided on
*/
//route to get now playing movies, calls nowPlaying from apiPuller
router.get("/now-playing", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movies = yield (0, apiPuller_1.nowPlaying)();
        res.json(movies);
    }
    catch (error) {
        console.error("Error getting now playing movies", error);
        res.status(500).send("Error getting now playing movies");
    }
}));
//route to get popular movies calls popularMovies from apiPuller
router.get("/popular-movies", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movies = yield (0, apiPuller_1.popularMovies)();
        res.json(movies);
    }
    catch (error) {
        console.error("Error getting popular movies", error);
        res.status(500).send("Error getting popular movies");
    }
}));
//search
exports.default = router;
