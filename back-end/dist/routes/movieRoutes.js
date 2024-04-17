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
const movieController_1 = require("../controllers/movieController");
const genreController_1 = require("../controllers/genreController");
const router = (0, express_1.Router)();
router.post("/addMovie", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movieId = req.query.movieId;
        const movie = yield (0, movieController_1.addMovie)(movieId);
        if (movie != null) {
            res.json(movie);
        }
        else {
            res.status(500).send("Error adding movie");
        }
    }
    catch (error) {
        console.error("Error adding movie", error);
        res.status(500).send("Error adding movie");
    }
}));
//route to delete movie from database by its id
router.delete("/deleteMovie", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movieId = req.query.movieId;
        const result = yield (0, movieController_1.deleteMovie)(movieId);
        if (result) {
            res.json({ message: "Movie deleted" });
        }
        else {
            res.status(500).send("Error deleting movie");
        }
    }
    catch (error) {
        console.error("Error deleting movie", error);
        res.status(500).send("Error deleting movie");
    }
}));
//test route to add genre to db by id and name
router.post("/test", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const genreId = req.query.genreId;
        const name = req.query.name;
        const result = yield (0, genreController_1.addGenre)(genreId, name);
        if (result) {
            res.json({ message: "genre added" });
        }
        else {
            res.status(500).send("Error adding genre");
        }
    }
    catch (error) {
        console.error("Error adding genre", error);
        res.status(500).send("Error adding genre");
    }
}));
//route to delete genre from database by its id
router.delete("/test2", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const genreId = req.query.genreId;
        const result = yield (0, genreController_1.deleteGenre)(genreId);
        if (result) {
            res.json({ message: "Genre deleted" });
        }
        else {
            res.status(500).send("Error deleting genre");
        }
    }
    catch (error) {
        console.error("Error deleting genre", error);
        res.status(500).send("Error deleting genre");
    }
}));
exports.default = router;
