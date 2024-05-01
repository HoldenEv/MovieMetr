import MovieGenres from "../models/movieGenres";
import Genre from "../models/genre";
import Movie from "../models/movies";
import TVshowGenres from "../models/TVshowGenres";

//adds a genre to the database
const addGenre = async (genreId: string, genreName: string) => {
  try {
    const existingGenre = await Genre.findOne({ _id: genreId });
    if (!existingGenre) {
      const newGenre = new Genre({
        _id: genreId,
        name: genreName,
      });
      await newGenre.save();
      return newGenre;
    } else {
      console.error("Error adding genre: Genre already in database");
      return null;
    }
  } catch (error) {
    console.error("Error adding genre", error);
  }
};
//adds a movie genre pairing to the database
//could add genre check here
const addMovieGenres = async (movieId: string, genreId: string) => {
  try {
    const newMovieGenre = new MovieGenres({
      movie_id: movieId,
      genre_id: genreId,
    });
    await newMovieGenre.save();
  } catch (error) {
    console.error("Error adding movie genre", error);
  }
};

//adds a tv genre pairing to the database
const addTVshowGenres = async (TVshowId: string, genreId: string) => {
  try {
    const newTvGenre = new TVshowGenres({
      TVshow_id: TVshowId,
      genre_id: genreId,
    });
    await newTvGenre.save();
  } catch (error) {
    console.error("Error adding tv genre", error);
  }
};

//gets a genre by its id from the database
const getGenre = async (genreId: string) => {
  try {
    const genre = await Genre.findOne({ _id: genreId });
    return genre;
  } catch (error) {
    console.error("Error getting genre", error);
    return null;
  }
};

//delets a genre from the db by id
const deleteGenre = async (genreId: string) => {
  try {
    await Genre.deleteOne({ _id: genreId });
    await MovieGenres.deleteMany({ genre_id: genreId });
    return true;
  } catch (error) {
    console.error("Error deleting genre", error);
    return false;
  }
};

//deletes a movie genre from the db by movie id and genre id
const deleteMovieGenre = async (movieId: string, genreId: string) => {
  try {
    await MovieGenres.deleteOne({ movie_id: movieId, genre_id: genreId });
    return true;
  } catch (error) {
    console.error("Error deleting movie genre", error);
    return false;
  }
};

//gets a list of all genres of a certain movie by movie id

export {
  addGenre,
  addMovieGenres,
  getGenre,
  deleteGenre,
  deleteMovieGenre,
  addTVshowGenres,
};
