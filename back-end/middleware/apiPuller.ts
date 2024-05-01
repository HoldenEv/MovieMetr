import axios from "axios";
import {getMovie} from "../controllers/movieController";
import * as dotenv from "dotenv";
import { get } from "http";
dotenv.config();

//access token is current method of authentication
const apiAccessToken: string | undefined = process.env.ACCESSTOKEN;
//key can be used inline of http request, couldnt get it to work though
const apiKey: string | undefined = process.env.APIKEY;

/* interfaces for movie search data... will likely need to change/remove 
these later based on what info we want to retreive*/
interface MovieData {
  id: number;
  title: string;
  original_title: string;
  year: string;
  image: string;
  summary: string;
}

/* interface for person search data */
interface PersonData {
  id: number;
  name: string;
  image: string;
}

/* interface for show search data */
interface ShowData {
  id: number;
  name: string;
  image: string;
  summary: string;
  startdate: string;
}

interface ApiResponse {
  page: number;
  total_pages: number;
  total_results: number;
  data: (MovieData | PersonData | ShowData)[];
}

//search for movies given a search string, currently returns id, title, image, and summary
const searchMovies = async (searchString: string, page: string) => {
  /* configure url for TMDB movie search URL */
  const url: string =
    "https://api.themoviedb.org/3/search/movie?api_key=" +
    apiKey +
    "&query=" +
    searchString +
    "&page=" +
    page;

  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + apiAccessToken,
    },
  };

  try {
    console.log(url);
    /* make GET request to the configured url */
    const response = await axios.get(url, options);

    /* map movie results data to our own array */
    const data: MovieData[] = response.data.results.map((movie: any) => ({
      id: movie.id,
      title: movie.title,
      original_title: movie.original_title,
      year: movie.release_date.slice(0, 4),
      image: movie.poster_path,
      summary: movie.overview,
    }));
    /* store page and result info */
    const page: number = response.data.page;
    const total_pages: number = response.data.total_pages;
    const total_results: number = response.data.total_results;

    /* return page, result info, movie list for response */
    const res: ApiResponse = {
      page,
      total_pages,
      total_results,
      data,
    };
    return res;
  } catch (error) {
    throw new Error("Error searching movies: " + error);
  }
};

//searchByActor returns a list of actors and their information
const searchByPeople = async (searchString: string, page: string) => {
  /* configure url for TMDB person search */
  const url =
    "https://api.themoviedb.org/3/search/person?api_key=" +
    apiKey +
    "&query=" +
    searchString +
    "&page=" +
    page;
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + apiAccessToken,
    },
  };

  try {
    /* make GET request to the configured url */
    const response = await axios.get(url, options);
    /* map people results data to our own array */
    const data: PersonData[] = response.data.results.map((person: any) => ({
      id: person.id,
      name: person.name,
      known_for_department: person.known_for_department,
      known_for: person.known_for
        .filter((movie: any) => movie.id && movie.title)
        .map((movie: any) => ({ id: movie.id, title: movie.title })),
      image: person.profile_path,
    }));
    /* store page and result info */
    const page: number = response.data.page;
    const total_pages: number = response.data.total_pages;
    const total_results: number = response.data.total_results;

    /* return page, result info, movie list for response */
    const res: ApiResponse = {
      page,
      total_pages,
      total_results,
      data,
    };
    return res;
  } catch (error) {
    throw new Error("Error searching people: " + error);
  }
};

//searchTvShows given a searchString returns a list of tv shows and
//their information filtered by a map
const searchTvShows = async (searchString: string, page: string) => {
  /* configure url for TMDB show search */
  const url =
    "https://api.themoviedb.org/3/search/tv?api_key=" +
    apiKey +
    "&query=" +
    searchString +
    "&page=" +
    page;
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + apiAccessToken,
    },
  };
  try {
    //make GET request to the configured url
    const response = await axios.get(url, options);
    // map show results to our own array
    const data: ShowData[] = response.data.results.map((show: any) => ({
      id: show.id,
      name: show.name,
      image: show.poster_path,
      original_name: show.original_name,
      summary: show.overview,
      startdate: show.first_air_date,
    }));
    // store page and result info
    const page: number = response.data.page;
    const total_pages: number = response.data.total_pages;
    const total_results: number = response.data.total_results;

    /* return page, result info, movie list for response */
    const res: ApiResponse = {
      page,
      total_pages,
      total_results,
      data,
    };

    return res;
  } catch (error) {
    throw new Error("Error searching shows: " + error);
  }
};

/**
 * gets all movie details by its id
 * @param id
 * @returns all the movie details as json object in response
 */
const movieById = async (id: string) => {
  console.log (id);
  if(await getMovie(id) != null){
    console.log(getMovie(id));
    return getMovie(id);
  }


  const url =
    "https://api.themoviedb.org/3/movie/" +
    id +
    "?api_key=" +
    apiKey +
    "&append_to_response=credits";
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + apiAccessToken,
    },
  };
  try {
    const response = await axios.get(url, options);
    //just returns all data for now, decide what to do with it later
    return response.data;
  } catch (error) {
    console.error("Error searching for movie details", error);
    throw error;
  }
};

/**
 * gets all TVshow details by its id
 * @param TVshowId - the id of the TVshow to get
 * @returns
 */
const TVshowById = async (TVshowId: string) => {
  const url =
    "https://api.themoviedb.org/3/tv/" + TVshowId + "?api_key=" + apiKey;
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + apiAccessToken,
    },
  };
  try {
    const response = await axios.get(url, options);
    return response.data;
  } catch (error) {
    console.error("Error searching for TVshow details", error);
    throw error;
  }
};

//personById returns all data for a person by id
const personById = async (id: string) => {
  const url =
    "https://api.themoviedb.org/3/person/" + id + "?api_key=" + apiKey;
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + apiAccessToken,
    },
  };
  try {
    const response = await axios.get(url, options);
    //just returns all data for now, decide what to do with it later
    return response.data;
  } catch (error) {
    console.error("Error searching for person details", error);
    throw error;
  }
};

//nowPlaying returns a list of movies currently playing in theaters
const nowPlaying = async () => {
  const url =
    "https://api.themoviedb.org/3/movie/now_playing?api_key=" + apiKey;
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + apiAccessToken,
    },
  };
  try {
    const response = await axios.get(url, options);
    //can edit this function to return different data if needed
    const movies = response.data.results.map((movie: any) => ({
      id: movie.id,
      title: movie.title,
      image: movie.poster_path,
      summary: movie.overview,
    }));
    return movies;
  } catch (error) {
    console.error("Error searching movies", error);
    throw error;
  }
};

//popularMovies returns a list of popular movies from TMDB
const popularMovies = async () => {
  const url = "https://api.themoviedb.org/3/movie/popular?api_key=" + apiKey;
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + apiAccessToken,
    },
  };
  try {
    const response = await axios.get(url, options);
    //can edit this function to return different data if needed
    const movies = response.data.results.map((movie: any) => ({
      id: movie.id,
      title: movie.title,
      image: movie.poster_path,
      summary: movie.overview,
    }));
    return movies;
  } catch (error) {
    console.error("Error searching movies", error);
    throw error;
  }
};

//getAllPersonMovies returns a list of all movies for a person by id
// use this on actor page to display all movies they have been in
//upon click of "see all movies" button... should query api
//because of many less popular movies that may not be in our database
const getAllPersonMovies = async (id: string) => {
  const url =
    "https://api.themoviedb.org/3/person/" +
    id +
    "/movie_credits?api_key=" +
    apiKey;
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + apiAccessToken,
    },
  };
  try {
    const response = await axios.get(url, options);
    //returns all movies for now the person was in, in the form of cast objects
    //not quite the same as the movie objects returned by the searchMovies function
    return response.data;
  } catch (error) {
    console.error("Error searching for person details", error);
    throw error;
  }
};

//getAllMoviePeople gets all people in a movie by id whos known_for_department is acting,directing,production,wrting
//use this for now to trigger the database entry for all people whne a movie is added

//Called by addMovie function in movieController

const getAllMoviePeople = async (id: string) => {
  const url =
    "https://api.themoviedb.org/3/movie/" + id + "/credits?api_key=" + apiKey;
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + apiAccessToken,
    },
  };
  try {
    const response = await axios.get(url, options);
    //filter by department being acting, wrting, directing, production
    //right now only looking through cast, not crew, add crew later for more comprehensive search
    const people = response.data.cast.filter((person: any) => {
      return (
        person.known_for_department === "Acting" ||
        person.known_for_department === "Directing" ||
        person.known_for_department === "Production" ||
        person.known_for_department === "Writing"
      );
    });
    return people;
  } catch (error) {
    console.error("Error searching for person details", error);
    throw error;
  }
};

/**
 * get all TVshow people given a TVshow id
 * @param TVshowId
 * @returns all people related to the TVshow
 */
const getAllTVPeople = async (TVshowId: string) => {
  const url =
    "https://api.themoviedb.org/3/tv/" +
    TVshowId +
    "/credits?api_key=" +
    apiKey;
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + apiAccessToken,
    },
  };
  try {
    const response = await axios.get(url, options);
    //filter by department being acting, wrting, directing, production
    //right now only looking through cast, not crew, add crew later for more comprehensive search
    const people = response.data.cast.filter((person: any) => {
      return (
        person.known_for_department === "Acting" ||
        person.known_for_department === "Directing" ||
        person.known_for_department === "Production" ||
        person.known_for_department === "Writing"
      );
    });
    return people;
  } catch (error) {
    console.error("Error searching for person details", error);
    throw error;
  }
};

/**
 * getAllPersonTVshows gets all TVshows for a person by their id
 * @param id
 * @returns all TVshows the person was in
 */
const getAllPersonTVshows = async (id: string) => {
  const url =
    "https://api.themoviedb.org/3/person/" +
    id +
    "/tv_credits?api_key=" +
    apiKey;
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + apiAccessToken,
    },
  };
  try {
    const response = await axios.get(url, options);
    //returns all TVshows for now the person was in, in the form of cast objects
    //not quite the same as the TVshow objects returned by the searchTvShows function
    return response.data;
  } catch (error) {
    console.error("Error searching for person details", error);
    throw error;
  }
};

export {
  searchMovies,
  movieById,
  searchByPeople,
  personById,
  searchTvShows,
  nowPlaying,
  popularMovies,
  getAllPersonMovies,
  getAllMoviePeople,
  TVshowById,
  getAllTVPeople,
  getAllPersonTVshows,
};
