import mongoose from "mongoose";
const { Schema } = mongoose;

const movieGenresSchema = new Schema({
  movie_id: {
    type: String,
    required: true,
    ref: "Movie",
  },
  genre_id: {
    type: String,
    required: true,
    ref: "Genre",
  },
});

const MovieGenres =  mongoose.models.MovieGenres || mongoose.model("MovieGenres", movieGenresSchema);
export default MovieGenres;
