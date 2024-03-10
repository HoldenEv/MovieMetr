import express from "express";
import { Request, Response, Router } from "express";
import {
  addMovie,
  getMovie,
  addPersonMovies,
  deleteMovie,
} from "../controllers/movieController";

const router = Router();

router.post("/addMovie", async (req: Request, res: Response) => {
  try {
    const movieId = req.query.movieId as string;
    const movie = await addMovie(movieId);
    if (movie != null) {
      res.json(movie);
    } else {
      res.status(500).send("Error adding movie");
    }
  } catch (error) {
    console.error("Error adding movie", error);
    res.status(500).send("Error adding movie");
  }
});

//route to delete movie from database by its id
router.delete("/deleteMovie", async (req: Request, res: Response) => {
  try {
    const movieId = req.query.movieId as string;
    const result = await deleteMovie(movieId);
    if (result) {
      res.json({ message: "Movie deleted" });
    } else {
      res.status(500).send("Error deleting movie");
    }
  } catch (error) {
    console.error("Error deleting movie", error);
    res.status(500).send("Error deleting movie");
  }
});

export default router;
