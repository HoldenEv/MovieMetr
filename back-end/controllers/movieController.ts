import Movie from '../models/movies';
import Genre from '../models/genre';
import MovieGenres from '../models/movieGenres';
import { addMoviePeople } from './personController';
import { movieById,getAllPersonMovies } from '../middleware/apiPuller';

/*when given a movie ID, query the TMDB API for the movie details
then add the movie to the database, including all related fields
This function could have the genre operations split into seperate functions,
especially if there are other instances they may need to be used, 
just cant think of any rn*/
const addMovie = async (movieId : string) => {
    try{
        //checks if movie is already in the database
        if(await Movie.findOne({_id: movieId}) != null){
            console.error("Error adding movie: Movie already in database");
            return null;
        }
        //grabs all movie details from the API
        const movie = await movieById(movieId);
        //grab all movie genres from the movie object
        const newMovie = new Movie({
            _id: movie.id,
            title: movie.title,
            year: movie.release_date,
            summary: movie.overview,
            image_path: movie.poster_path,
        });
        await newMovie.save();

        //add all people(actors, directors, producers,writers) to the database
        //defined in personController
        addMoviePeople(movieId);

        /*add genres to genre collection if not already there
        should be only time to add a genre to the collection,
        if not then move this to seperate function in genreController*/
        for (let genre of movie.genres){
            const genreId = genre.id;
            const genreName = genre.name;
            const genreCheck = await Genre.findOne({ _id: genreId });
            if (!genreCheck){
                const newGenre = new Genre({
                    _id: genreId,
                    name: genreName,
                });
                await newGenre.save();
            }
        }
        //add genre-movie pairs to movieGenres collection
        for (let genre of movie.genres){
            const genreId = genre.id;
            const newMovieGenre = new MovieGenres({
                movie_id: movie.id,
                genre_id: genreId,
            });
            await newMovieGenre.save();
        }
        return newMovie;

    } catch (error){
        console.error("Error adding movie", error);
        return null;
    }
};

//adds all movies by a given person to the database
const addPersonMovies = async (personId: string) => {
    try{
        //query the api for all movies related to the person
        const result = await getAllPersonMovies(personId);
        //think we need this libe because AllPersonMovies returns a list of movies as cast
        //objects by calling people/moviecredits, so we need to grab the cast field from the result
        const movies = result.cast;
        //add each movie to the database
        for (let movie of movies){
            addMovie(movie.id);
        }
    } catch (error){
        console.error("Error adding movies", error);
    }
}

//gets a movie from the database by its id
const getMovie = async (movieId : string) => {
    try{
        const movie = await Movie.findOne({_id: movieId});
        return movie;
    } catch (error){
        console.error("Error getting movie", error);
        return null;
    }
}


/*delets a movie from the database by its id
also deletes all genre-movie pairs for the movie*/
const deleteMovie = async (movieId : string) => {
    try{
        await Movie.deleteOne({_id: movieId});
        await MovieGenres.deleteMany({movie_id: movieId});
        return true;
    } catch (error){
        console.error("Error deleting movie", error);
        return false;
    }
}

export{ addMovie,addPersonMovies,getMovie,deleteMovie}
