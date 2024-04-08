import List from "../models/lists";
import User from "../models/user";
import Movie from "../models/movies";
import Tvshow from "../models/TVshows";
import { addMovie } from "./movieController";

//adds a new list to the database, takes a list name and user id
const addList = async (name: string, userId: string) => {
  try {
    const newList = new List({
      name: name,
      user_id: userId,
    });
    await newList.save();
    return newList;
    } catch (error) {
    console.error("Error adding list", error);
    return null;
    }
}

//deletes a list from the database by its id
const deleteList = async (listId: string) => {
  try {
    await List.deleteOne({ _id: listId });
    return true;
    } catch (error) {
    console.error("Error deleting list", error);
    return false;
    }
}

//adds a movie to a list by its id
const addMovieToList = async (listId: string, movieId: string) => {
  try {
    //grab list from db
    const list = await List.findOne({ _id: listId });
    //check if list exists
    if (!list) {
      console.error("Error adding movie to list: List not found");
      return null;
    }
    //check if movie exists
    const movie = await Movie.findOne ({ _id: movieId });
    if (!movie){
        //add movie to db
       addMovie(movieId);
    }
    //check if movie is already in list
    if (list.movies.includes(movieId)){
      console.error("Error adding movie to list: Movie already in list");
      return null;
    }
    //add movie to list
    