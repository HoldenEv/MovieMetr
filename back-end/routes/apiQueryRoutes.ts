import { Request, Response, Router } from "express";
import {
  searchByPeople,
  movieById,
  personById,
  searchMovies,
  searchTvShows,
  nowPlaying,
  popularMovies,
  getCombinedCredits,
} from "../middleware/apiPuller";
const router = Router();

/*
  Search by either: 'movies', 'shows', 'people'. Calls various functions from 
  apiPuller.
*/
router.get("/search", async (req: Request, res: Response) => {
  try {
    const name = req.query.name as string;
    const page = req.query.page as string;
    const category = req.query.category as string;

    let results: object = {};

    if (category === "movies") {
      results = await searchMovies(name, page);
    } else if (category === "shows") {
      results = await searchTvShows(name, page);
    } else if (category === "people") {
      results = await searchByPeople(name, page);
    } else {
      throw new Error("invalid category");
    }
    res.json(results);
  } catch (error) {
    console.error("Error searching movies", error);
    res.status(500).send("An error occurred while searching.");
  }
});

interface Credit {
  id: number;
  title: string;
  name: string;
  media_type: string;
  poster_path: string;
  popularity: string;
  vote_count: number;
  release_date: string;
}

interface Crew {
  id: number;
  title: string;
  name: string;
  job: string;
  media_type: string;
  poster_path: string;
  popularity: string;
  vote_count: number;
  release_date: string;
}

interface Credits {
  cast: Credit[];
  crew: Crew[];
}

/*
  Gets actor details by their TMDB id, calls personById function from apiPuller.
*/
router.get("/people/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const person = await personById(id);
    const credits: Credits = await getCombinedCredits(id);
    credits.cast = credits.cast.map(
      ({
        id,
        title,
        name,
        media_type,
        poster_path,
        popularity,
        vote_count,
        release_date,
      }) => ({
        id,
        title: media_type === "tv" ? name : title,
        name,
        media_type,
        poster_path,
        popularity,
        vote_count,
        release_date,
      }),
    );
    credits.crew = credits.crew.map(
      ({
        id,
        title,
        name,
        job,
        media_type,
        poster_path,
        popularity,
        vote_count,
        release_date,
      }) => ({
        id,
        title,
        name,
        job,
        media_type,
        poster_path,
        popularity,
        vote_count,
        release_date,
      }),
    );

    res.json({ ...person, credits });
  } catch (error) {
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
