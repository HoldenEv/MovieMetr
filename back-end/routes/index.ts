import express, { Request, Response, Router } from "express";
import { searchByActor,movieById,personById,searchMovies,searchTvShows,nowPlaying,popularMovies } from "../apiPuller";
const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express!");
});

//route to search for movies
router.get("/search-movies", async (req: Request, res: Response) => {
  try{
    //may need to alter this to get the search string from the body properly
    //searchString is the current key for the search
    const searchString = req.query.searchString as string;
    const movies = await searchMovies(searchString);
    res.json(movies);
  }
  catch(error){
    console.error('Error searching movies', error);
    res.status(500).send('Error searching movies');
  }
});

//route to get movie details by id,calls movieById from apiPuller
//result is all data right now, edit movieById to map results based on whats needed
router.get("/details-movie", async (req: Request, res: Response) => {
  try{
    const id = req.query.id as string;
    const movie = await movieById(id);
    res.json(movie);
  }
  catch(error){
    console.error('Error getting movie details', error);
    res.status(500).send('Error getting movie details');
  }
});

//route to search for actors calls searchByActor from apiPuller
router.get("/search-actors", async (req: Request, res: Response) => {
  try{
    //may need to alter this to get the search string from the body properly
    //searchString is the current key for the search
    const searchString = req.query.searchString as string;
    const actors = await searchByActor(searchString);
    res.json(actors);
  }
  catch(error){
    console.error('Error searching actors', error);
    res.status(500).send('Error searching actors');
  }
});

//route to get actor details by id, calls personById() from apiPuller
router.get("/details-actor", async (req: Request, res: Response) => {
  try{
    const id = req.query.id as string;
    const actor = await personById(id);
    res.json(actor);
  }
  catch(error){
    console.error('Error getting actor details', error);
    res.status(500).send('Error getting actor details');
  }
});

//route to search for tv shows, calls searchTvShows from apiPuller
router.get("/search-tv", async (req: Request, res: Response) => {
  try{
    //searchString is the current key for the search
    const searchString = req.query.searchString as string;
    const tvShows = await searchTvShows(searchString);
    res.json(tvShows);
  }
  catch(error){
    console.error('Error searching tv shows', error);
    res.status(500).send('Error searching tv shows');
  }
});




/*Below are routes tor return movie lists(popular, now playing, top rated, by genre perhaps,
  have the routes here for testing for now, likely wont need these until a home page is decided on
*/

//route to get now playing movies, calls nowPlaying from apiPuller
router.get("/now-playing", async (req: Request, res: Response) => {
  try{
    const movies = await nowPlaying();
    res.json(movies);
  }
  catch(error){
    console.error('Error getting now playing movies', error);
    res.status(500).send('Error getting now playing movies');
  }
});

//route to get popular movies calls popularMovies from apiPuller
router.get("/popular-movies", async (req: Request, res: Response) => {
  try{
    const movies = await popularMovies();
    res.json(movies);
  }
  catch(error){
    console.error('Error getting popular movies', error);
    res.status(500).send('Error getting popular movies');
  }
});


//search
export default router;
