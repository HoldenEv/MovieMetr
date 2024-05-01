import { Request, Response, Router } from "express";
import {
  addTVshow,
  getTVshow,
  deleteTVshow,
} from "../controllers/TVshowController";

const router = Router();

//route to add TVshow to database by its id
//addTVsow function contains trigger to add TVshowGenres and TVshowCast
router.post("/addTVshow", async (req: Request, res: Response) => {
  try {
    //query param for now, not sure whats standard
    const TVshowId = req.query.TVshowId as string;
    const TVshow = await addTVshow(TVshowId);
    if (TVshow != null) {
      res.json(TVshow);
    } else {
      res.status(500).send("Error adding TVshow");
    }
  } catch (error) {
    console.error("Error adding TVshow", error);
    res.status(500).send("Error adding TVshow");
  }
});

//route to delete TVshow from database by its id
router.delete("/deleteTVshow", async (req: Request, res: Response) => {
  try {
    //query param for now, not sure whats standard
    const TVshowId = req.query.TVshowId as string;
    const result = await deleteTVshow(TVshowId);
    if (result) {
      res.json({ message: "TVshow deleted" });
    } else {
      res.status(500).send("Error deleting TVshow");
    }
  } catch (error) {
    console.error("Error deleting TVshow", error);
    res.status(500).send("Error deleting TVshow");
  }
});

//route to get TVshow from database by its id
router.get("/getTVshow", async (req: Request, res: Response) => {
  try {
    //query param for now, not sure whats standard
    const TVshowId = req.query.TVshowId as string;
    const TVshow = await getTVshow(TVshowId);
    if (TVshow) {
      res.json(TVshow);
    } else {
      res.status(500).send("Error getting TVshow");
    }
  } catch (error) {
    console.error("Error getting TVshow", error);
    res.status(500).send("Error getting TVshow");
  }
});

export default router;
