import { Request, Response, Router } from "express";
import { addPerson } from "../controllers/personController";
const router = Router();
//will need to modify the followers in user model and
//some controller functions to allow for the ability for a user to follow person objects

/**
 * Route to add a person to the database
 * @param personId - the id of the person to add
 * @returns the person object that was added
 */
router.post("/addPerson", async (req: Request, res: Response) => {
  try {
    const personId = req.query.personId as string;
    const person = await addPerson(personId);
    if (person != null) {
      res.json(person);
    } else {
      res.status(500).send("Error adding person");
    }
  } catch (error) {
    console.error("Error adding person", error);
    res.status(500).send("Error adding person");
  }
});

export default router;
