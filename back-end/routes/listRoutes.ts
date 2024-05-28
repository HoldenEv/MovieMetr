import { Request, Response, Router } from "express";
import { addList, addMovieToList, deleteList, deleteMovieFromList } from "../controllers/listController";
import List from "../models/lists";
const router = Router();

//route to add list to db
router.post("/addList", async (req: Request, res: Response) => {
  try {
    //grab name and user id from query params, could change where they are later
    //just easy for postman testing
    const name = req.query.name as string;
    const userId = req.query.userId as string;
    const list = await addList(name, userId);
    if (list != null) {
      res.json(list);
    } else {
      res.status(500).send("Error adding list");
    }
  } catch (error) {
    console.error("Error adding list", error);
    res.status(500).send("Error adding list");
  }
});

//route to add movie to list by list id given a movie id
// doesnt work, need to fix, think its a problem with addMovie,
//maybe the way im storing the mvoies in the .etries field3
router.post("/addMovieToList", async (req: Request, res: Response) => {
  try {
    //grab list and movie id from query params, could change where they are later
    //just easy for postman testing
    const listId = req.query.listId as string;
    const movieId = req.query.movieId as string;
    const result = await addMovieToList(listId, movieId);
    if (result != null) {
      res.json(result);
    } else {
      res.status(500).send("Error adding movie to list");
    }
  } catch (error) {
    console.error("Error adding movie to list", error);
    res.status(500).send("Error adding movie to list");
  }
});

//route to get all list from a user
router.get("/getLists", async (req: Request, res: Response) => {
  try {
    //grab user id from query params, could change where they are later
    //just easy for postman testing
    const userId = req.query.userId as string;
    const lists = await List.find({ user_id: userId });
    res.json(lists);
  } catch (error) {
    console.error("Error getting lists", error);
    res.status(500).send("Error getting lists");
  }
});

//route to get list by id
router.get("/getList", async (req: Request, res: Response) => {
  try {
    //grab list id from query params, could change where they are later
    //just easy for postman testing
    const listId = req.query.listId as string;
    const list = await List.findOne({ _id: listId });
    res.json(list);
  } catch (error) {
    console.error("Error getting list", error);
    res.status(500).send("Error getting list");
  }
});

// Route to delete a list
router.delete("/deleteList", async (req: Request, res: Response) => {
  try {
    const listId = req.query.listId as string;
    const result = await deleteList(listId);
    if (result != null) {
      res.json(result);
    } else {
      res.status(500).send("Error deleting list");
    }
  } catch (error) {
    console.error("Error deleting list", error);
    res.status(500).send("Error deleting list");
  }
});

// Route to delete a movie from a list
router.delete("/deleteMovieFromList", async (req: Request, res: Response) => {
  try {
    const listId = req.query.listId as string;
    const movieId = req.query.movieId as string;
    const result = await deleteMovieFromList(listId, movieId);
    if (result != null) {
      res.json(result);
    } else {
      res.status(500).send("Error deleting movie from list");
    }
  } catch (error) {
    console.error("Error deleting movie from list", error);
    res.status(500).send("Error deleting movie from list");
  }
});

export default router;
