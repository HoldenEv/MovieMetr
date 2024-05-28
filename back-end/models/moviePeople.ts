//mongoose schema to map movie_id's to a person's id,
//allowing for querying all movies a person is in, and all people in a movie,
import mongoose from "mongoose";
const { Schema } = mongoose;

const moviePeopleSchema = new Schema({
  movie_id: {
    type: String,
    required: true,
    ref: "Movie",
  },
  person_id: {
    type: String,
    required: true,
    ref: "Person",
  },
  //so we can also specify the department of the person in the movie, when querying all people in a movie
  department: {
    type: String,
    required: true,
  },
});

const MoviePeople = mongoose.models.MoviePeople || 
mongoose.model("MoviePeople", moviePeopleSchema);
export default MoviePeople;
