import {
  addReview,
  deleteReview,
  getMovieReviews,
  getUserReviews,
  getReview,
} from "../../controllers/reviewsController";
import { addMovie, deleteMovie } from "../../controllers/movieController";
const mongoose = require("mongoose");
import * as dotenv from "dotenv";
dotenv.config();
//connect to the db before all tests
beforeAll(async () => {
  await mongoose.connect(process.env.URI);
});

//disconnect from the db after all tests
afterAll(async () => {
  await mongoose.disconnect();
});

// test that a review can succesfully be added and deleted
test("Add review and delete", async () => {
  const testMovieId: string = "634492";
  const testUserId: string = "1234";
  const testReviewString: string = "This is a test review string.";
  const testRating: string = "8";

  const addResult = await addReview(
    testMovieId,
    testUserId,
    testReviewString,
    testRating
  );

  // addReview should add to database and return the object on success
  expect(addResult).toMatchObject({
    movie_id: testMovieId,
    user_id: testUserId,
    review: testReviewString,
    rating: testRating,
  });

  // test delete in same function for now so we can keep the database clean
  const deleteResult = await deleteReview(addResult._id);
  expect(deleteResult).toBe(true);
});

// adding a review for a non-existent film should return null
test("Add review, movie not in database", async () => {
  const testMovieId: string = "This ID is not in the DB";
  const testUserId: string = "12985";
  const testReviewString: string = "This is a test review string.";
  const testRating: string = "10";

  const result = await addReview(
    testMovieId,
    testUserId,
    testReviewString,
    testRating
  );

  expect(result).toBe(null);
});

test("delete non-existent review", async () => {
  const result = await deleteReview("blahblahblah");
  expect(result).toBe(false);
});

test("get review", async () => {
  const testMovieId: string = "634492";
  const testUserId: string = "12985";
  const testReviewString: string = "This is a test review string.";
  const testRating: string = "10";

  const addResult = await addReview(
    testMovieId,
    testUserId,
    testReviewString,
    testRating
  );

  const result = await getReview(addResult._id);
  expect(result).toMatchObject({
    movie_id: testMovieId,
    user_id: testUserId,
    review: testReviewString,
    rating: testRating,
  });

  await deleteReview(addResult._id);
});

test("get review, review DNE", async () => {
  const result = await getReview("This ID DNE");
  expect(result).toBe(null);
});

test("get movie reviews, get user reviews", async () => {
  const testMovieId: string = "634492";
  const testUserId: string = "12985";
  const testReviewString: string = "This is a test review string.";
  const testRating: string = "10";

  const addResult = await addReview(
    testMovieId,
    testUserId,
    testReviewString,
    testRating
  );

  const movieResult = await getMovieReviews("634492");
  expect(movieResult).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        movie_id: testMovieId,
        user_id: testUserId,
        review: testReviewString,
        rating: testRating,
      }),
    ])
  );

  const userResult = await getUserReviews("12985");
  expect(userResult).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        movie_id: testMovieId,
        user_id: testUserId,
        review: testReviewString,
        rating: testRating,
      }),
    ])
  );
});