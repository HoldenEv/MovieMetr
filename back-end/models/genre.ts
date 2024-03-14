import mongoose from "mongoose";
const { Schema } = mongoose;

const GenreSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  /*could add a list of movies that have this genre,would be alot of duplication
  since im embedding genres in the movie model we would have to check the genre list of each movie
  to get all movies of a certain genre, might be expensive
  may be better to have a seperate model for genre and movie relationship called movie genres
  I'm unsure and lukas thinks embedding is better*/

  /*personally I think a seprate model for genre and movie relationship would be better,
  but im not sure if querying many models with many table joins is more expensivethan embedding*/
});

const Genre = mongoose.model("Genre", GenreSchema);
export default Genre;
