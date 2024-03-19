import MovieGenres from "../models/movieGenres";
import Genre from "../models/genre";
import Movie from "../models/movies";

const addGenre = async (genreId: string, genreName: string) => {
  try {
    const existingGenre = await Genre.findOne({ _id: genreId });
    if (!existingGenre) {
      const newGenre = new Genre({
        _id: genreId,
        name: genreName,
      });
      await newGenre.save();
    } else {
      console.error("Error adding genre: Genre already in database");
      return null;
    }
  } catch (error) {
    console.error("Error adding genre", error);
  }
};

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

export { addGenre, addMovieGenres };
