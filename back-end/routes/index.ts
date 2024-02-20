import express, { Request, Response, Router } from "express";
import {
  searchByPeople,
  movieById,
  personById,
  searchMovies,
  searchTvShows,
  nowPlaying,
  popularMovies,
} from "../apiPuller";
const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express!");
});

router.get("/search", async (req: Request, res: Response) => {
  try {
    const name = req.query.name as string;
    const category = req.query.category as string;

    let results: any = {};

    if (category === "movies") {
      results = await searchMovies(name);
    } else if (category === "shows") {
      results = await searchTvShows(name);
    } else if (category === "people") {
      results = await searchByPeople(name);
    } else {
      throw new Error("invalid category");
    }
    res.json(results);
  } catch (error) {
    console.error("Error searching movies", error);
    res.status(500).send("An error occurred while searching.");
  }
});

/*
  Gets actor details by their TMDB id, calls personById function from apiPuller.
*/
router.get("/people/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const movie = await personById(id);
    res.json(movie);
  } catch(error) {
    console.error("Error getting movie details", error);
    res.status(500).send("Error getting movie details");
  }
});

/*
  Gets movie details by their TMDB id, calls movieById function from apiPuller.
*/
router.get("/movies/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const movie = await movieById(id);
    res.json(movie);
  } catch (error) {
    console.error("Error getting movie details", error);
    res.status(500).send("Error getting movie details");
  }
});

/*Below are routes tor return movie lists(popular, now playing, top rated, by genre perhaps,
  have the routes here for testing for now, likely wont need these until a home page is decided on
*/

//route to get now playing movies, calls nowPlaying from apiPuller
router.get("/now-playing", async (req: Request, res: Response) => {
  try {
    const movies = await nowPlaying();
    res.json(movies);
  } catch (error) {
    console.error("Error getting now playing movies", error);
    res.status(500).send("Error getting now playing movies");
  }
});

//route to get popular movies calls popularMovies from apiPuller
router.get("/popular-movies", async (req: Request, res: Response) => {
  try {
    const movies = await popularMovies();
    res.json(movies);
  } catch (error) {
    console.error("Error getting popular movies", error);
    res.status(500).send("Error getting popular movies");
  }
});

//search
export default router;
