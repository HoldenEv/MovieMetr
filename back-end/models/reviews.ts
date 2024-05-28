import mongoose from "mongoose";
const { Schema } = mongoose;

const ReviewSchema = new Schema({
  movie_id: {
    type: String,
    required: true,
    ref: "Movie",
  },
  user_id: {
    type: String,
    required: true,
    ref: "User",
  },
  review: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
});
//virtual field to grab the movie name from the movie model using the movie_id
ReviewSchema.virtual("title", {
  ref: "Movie",
  localField: "movie_id",
  foreignField: "_id",
  justOne: true,
});

//virtual field to grab the username from the user model using the user_id
ReviewSchema.virtual("username", {
  ref: "User",
  localField: "user_id",
  foreignField: "_id",
  justOne: true,
});

const Review = mongoose.models.Review ||
mongoose.model("Review", ReviewSchema);

export default Review;
