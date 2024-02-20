import express, { Request, Response, Router } from "express";
import { searchMovies } from "../apiPuller";
const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express!");
});

//route to search for movies
router.get("/search-movies", async (req: Request, res: Response) => {
  try{
    //may need to alter this to get the search string from the body properly
    const searchString = req.query.searchString as string;
    const movies = await searchMovies(searchString);
    res.json(movies);
  }
  catch(error){
    console.error('Error searching movies', error);
    res.status(500).send('Error searching movies');
  }
});

export default router;
