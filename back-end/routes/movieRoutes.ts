import express from "express";
import { Request, Response, Router } from "express";
import {addMovie, getMovie, addPersonMovies} from "../controllers/movieController";

const router = Router();

router.get("/", (req: Request, res: Response) => {
    res.send("Hello, TypeScript Express!");
  });

router.post("/addMovie", async (req: Request, res: Response) => {
    try {
        const movieId = req.query.movieId as string;
        const movie = await addMovie(movieId);
        if (movie != null){
            res.json(movie);
        } else {
            res.status(500).send("Error adding movie");
        }
    } catch (error) {
        console.error("Error adding movie", error);
        res.status(500).send("Error adding movie");
    }
});

export default router;
