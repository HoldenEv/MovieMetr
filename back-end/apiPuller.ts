import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();

//access token is current method of authentication
const apiAccessToken: string | undefined = process.env.ACCESSTOKEN;
//key can be used inline of http request, couldnt get it to work though
const apiKey: string | undefined = process.env.APIKEY;

/* interfaces for movie search data */
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
    searchString;
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + apiAccessToken,
    },
  };
  try {
    /* make GET request to the configured url */
    const response = await axios.get(url, options);
    /* map show results to our own array */
    const data: ShowData[] = response.data.results.map((show: any) => ({
      id: show.id,
      name: show.name,
      image: show.poster_path,
      summary: show.overview,
      startdate: show.first_air_date,
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
    throw new Error("Error searching shows: " + error);
  }
};

/*
    Returns details for movie given a TMDB id, including cast info.
*/
const movieById = async (id: string) => {
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

export {
  searchMovies,
  movieById,
  searchByPeople,
  personById,
  searchTvShows,
  nowPlaying,
  popularMovies,
};
