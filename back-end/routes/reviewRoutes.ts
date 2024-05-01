import { Request, Response, Router } from "express";
import {
  addReview,
  getReview,
  deleteReview,
  getUserReviews,
  getMovieReviews,
} from "../controllers/reviewsController";
const router = Router();

//in the future could edit the review model to have a comment field
//then add a cotroller function to add comments to a review

/**
 * Route to add a review to the database
 * @param movieId - the id of the movie the review is for
 * @param userId - the id of the user who wrote the review
 * @param review - the text of the review
 * @param rating - the rating of the movie
 * @returns the review object that was added
 */
router.post("/addReview", async (req: Request, res: Response) => {
  try {
    //only validation for review string to be non null, could add more
    //or do so in the front end
    const { movieId, userId, reviewString, rating } = req.body;
    const review = await addReview(movieId, userId, reviewString, rating);
    if (review != null) {
      res.json(review);
    } else {
      res.status(500).send("Error adding review");
    }
  } catch (error) {
    console.error("Error adding review", error);
    res.status(500).send("Error adding review");
  }
});

/**
 * Route to get a review by its id
 * @param reviewId - the id of the review to get
 * @returns the review object
 */
router.get("/getReviewById", async (req: Request, res: Response) => {
  try {
    const reviewId = req.body.reviewId as string;
    const review = await getReview(reviewId);
    if (review != null) {
      res.json(review);
    } else {
      res.status(404).send("Review not found");
    }
  } catch (error) {
    console.error("Error getting review", error);
    res.status(500).send("Error getting review");
  }
});

/**
 * Route to delete a review by its id
 * @param reviewId - the id of the review to delete
 * @returns a message indicating the review was deleted
 */
router.delete("/deleteReview", async (req: Request, res: Response) => {
  try {
    const reviewId = req.body.reviewId as string;
    const result = await deleteReview(reviewId);
    if (result) {
      res.json({ message: "Review deleted" });
    } else {
      res.status(500).send("Error deleting review");
    }
  } catch (error) {
    console.error("Error deleting review", error);
    res.status(500).send("Error deleting review");
  }
});

/**
 * Route to get all reviews for a movie by its id
 * @param movieId - the id of the movie to get reviews for
 * @returns an array of review objects
 */
router.get("/getMovieReviews", async (req: Request, res: Response) => {
  try {
    const movieId = req.body.movieId as string;
    const reviews = await getMovieReviews(movieId);
    if (reviews != null) {
      res.json(reviews);
    } else {
      res.status(404).send("No reviews found for movie");
    }
  } catch (error) {
    console.error("Error getting reviews", error);
    res.status(500).send("Error getting reviews");
  }
});

/**
 * Route to get all reviews for a user by their id
 * @param userId - the id of the user to get reviews for
 * @returns an array of review objects
 */
router.get("/getUserReviews", async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId as string;
    const reviews = await getUserReviews(userId);
    if (reviews != null) {
      res.json(reviews);
    } else {
      res.status(404).send("No reviews found for user");
    }
  } catch (error) {
    console.error("Error getting reviews", error);
    res.status(500).send("Error getting reviews");
  }
});

export default router;
