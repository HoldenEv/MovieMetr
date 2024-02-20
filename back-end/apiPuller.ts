import axios from 'axios';
//access token is current method of authentication
const apiAccessToken='eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiM2M2NTAyNGEyZmIzNmI0ZWI1ZjQ3MmY1ZThlYTY5ZCIsInN1YiI6IjY1Y2ZjM2RiMDcyMTY2MDE2MjM4ZmI4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.a8Fu3-dZR5oxl04VuFwMzTyaMbJlWCCJ8wQjg505cYY;'
//key can be used inline of http request, couldnt get it to work though
const apiKey='b3c65024a2fb36b4eb5f472f5e8ea69d';


//search for movies given a search string, currently returns id, title, image, and summary
const searchMovies = async (searchString: string) => {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key='+apiKey+'&query='+searchString;
    const options = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+apiAccessToken
        }
    };
    try{
        const response = await axios.get(url, options);
        //can edit this function to return more data if needed
        //calling apiById(with movie.id) will return all data for now
        const movies = response.data.results.map((movie: any) => ({
            id:movie.id,
            title:movie.title,
            image:movie.poster_path,
            summary:movie.overview,
        }));
        return movies;
    }
    catch(error){
        console.error('Error searching movies', error);
        throw error;
    }
}   

//searchByActor returns a list of actors and their information
const searchByActor = async (searchString: string) => {
    const url = 'https://api.themoviedb.org/3/search/person?api_key='+apiKey+'&query='+searchString;
    const options = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+apiAccessToken
        }
    };
    try{
        const response = await axios.get(url, options);
        //can edit this function to return more data if needed
        //calling apiById(with actor.id) will return all data for now
        const actors = response.data.results.map((actor: any) => ({
            id:actor.id,
            name:actor.name,
            image:actor.profile_path,
        }));
        return actors;
    }
    catch(error){
        console.error('Error searching actors', error);
        throw error;
    }
}

//searchTvShows given a searchString returns a list of tv shows and 
//their information filtered by a map
const searchTvShows = async (searchString: string) => {
    const url = 'https://api.themoviedb.org/3/search/tv?api_key='+apiKey+'&query='+searchString;
    const options = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+apiAccessToken
        }
    };
    try{
        const response = await axios.get(url, options);
        //can edit this function to return more data if needed
        //calling apiById(with tvShow.id) will return all data for now
        const tvShows = response.data.results.map((tvShow: any) => ({
            id:tvShow.id,
            name:tvShow.name,
            image:tvShow.poster_path,
            summary:tvShow.overview,
            startdate:tvShow.first_air_date,
        }));
        return tvShows;
    }
    catch(error){
        console.error('Error searching tv shows', error);
        throw error;
    }
}

//returns all data for a movie by id
//no need for a route, will be behind the scenes
const movieById = async (id: string) => {
    const url = 'https://api.themoviedb.org/3/movie/'+id+'?api_key='+apiKey;
    const options = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+apiAccessToken
        }
    };
    try{
        const response = await axios.get(url, options);
        //just returns all data for now, decide what to do with it later
        return response.data;
    }
    catch(error){
        console.error('Error searching for movie details', error);
        throw error;
    }
}
//personById returns all data for a person by id
const personById = async (id: string) => {
    const url = 'https://api.themoviedb.org/3/person/'+id+'?api_key='+apiKey;
    const options = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+apiAccessToken
        }
    };
    try{
        const response = await axios.get(url, options);
        //just returns all data for now, decide what to do with it later
        return response.data;
    }
    catch(error){
        console.error('Error searching for person details', error);
        throw error;
    }
}

//nowPlaying returns a list of movies currently playing in theaters
const nowPlaying = async () => {
    const url = 'https://api.themoviedb.org/3/movie/now_playing?api_key='+apiKey;
    const options = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+apiAccessToken
        }
    };
    try{
        const response = await axios.get(url, options);
        //can edit this function to return different data if needed
        const movies = response.data.results.map((movie: any) => ({
            id:movie.id,
            title:movie.title,
            image:movie.poster_path,
            summary:movie.overview,
        }));
        return movies;
    }
    catch(error){
        console.error('Error searching movies', error);
        throw error;
    }
}

//popularMovies returns a list of popular movies from TMDB
const popularMovies = async () => {
    const url = 'https://api.themoviedb.org/3/movie/popular?api_key='+apiKey;
    const options = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+apiAccessToken
        }
    };
    try{
        const response = await axios.get(url, options);
        //can edit this function to return different data if needed
        const movies = response.data.results.map((movie: any) => ({
            id:movie.id,
            title:movie.title,
            image:movie.poster_path,
            summary:movie.overview,
        }));
        return movies;
    }
    catch(error){
        console.error('Error searching movies', error);
        throw error;
    }
}





export {searchMovies, movieById,searchByActor,personById,searchTvShows,nowPlaying,popularMovies};










