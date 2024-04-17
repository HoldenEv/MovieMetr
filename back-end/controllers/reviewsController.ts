import Review from "../models/reviews";
import Movie from "../models/movies";
import User from "../models/user";
import { addMovie } from "./movieController";

//adds a new review to the database, takes in the movie id, user id, review text, and rating
const addReview = async (
  movieId: string,
  userId: string,
  reviewString: string,
  rating: string,
) => {
  try {
    //check if movie in db, if not adds it
    if ((await Movie.findOne({ _id: movieId })) == null) {
      addMovie(movieId);
    }
    //check is user exists
    if ((await User.findOne({ _id: userId })) == null) {
        console.error("Error adding review: User not in database");
        return null;
    }
    if(reviewString == null){
        console.error("Error adding review: Review string is null");
        return null;
    }
    const newReview = new Review({
      movie_id: movieId,
      user_id: userId,
      review: reviewString,
      rating: rating,
      time: Date.now(),
    });
    await newReview.save();
    return newReview;
  } catch (error) {
    console.error("Error adding review", error);
    return null;
  }
};

//deletes a review from the database by its id
const deleteReview = async (reviewId: string) => {
  try {
    await Review.deleteOne({ _id: reviewId });
    return true;
  } catch (error) {
    console.error("Error deleting review", error);
    return false;
  }
};

//gets a review by its id from the database
const getReview = async (reviewId: string) => {
  try {
    const review = await Review.findOne({ _id: reviewId });
    return review;
  } catch (error) {
    console.error("Error getting review", error);
    return null;
  }
};


//returns all reviews objects for a movie by its id
const getMovieReviews = async (movieId: string) => {
  try {
    const reviews = await Review.find({ movie_id: movieId });
    return reviews;
  } catch (error) {
    console.error("Error getting reviews", error);
    return null;
  }
};

//returns all reviews objects for a user by their id
const getUserReviews = async (userId: string) => {
  try {
    const reviews = await Review.find({ user_id: userId });
    return reviews;
  } catch (error) {
    console.error("Error getting reviews", error);
    return null;
  }
};

export { addReview, deleteReview, getMovieReviews, getUserReviews,getReview };
