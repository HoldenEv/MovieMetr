import express from "express";
import { Request, Response, Router } from "express";
import {
  addMovie,
  getMovie,
  addPersonMovies,
  deleteMovie,
} from "../controllers/movieController";
import { addGenre,deleteGenre } from "../controllers/genreController";

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

//test route to add genre to db by id and name
router.post("/test", async (req: Request, res: Response) => {
  try {
    
    const genreId = req.query.genreId as string;
    const name = req.query.name as string;
    const result = await addGenre(genreId, name);
    if (result) {
      res.json({ message: "genre added" });
    } else {
      res.status(500).send("Error adding genre");
    }
  } catch (error) {
    console.error("Error adding genre", error);
    res.status(500).send("Error adding genre");
  }
});

//route to delete genre from database by its id
router.delete("/test2", async (req: Request, res: Response) => {
  try {
    const genreId = req.query.genreId as string;
    const result = await deleteGenre(genreId);
    if (result) {
      res.json({ message: "Genre deleted" });
    } else {
      res.status(500).send("Error deleting genre");
    }
  } catch (error) {
    console.error("Error deleting genre", error);
    res.status(500).send("Error deleting genre");
  }
});
export default router;
