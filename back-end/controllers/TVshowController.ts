import TVshow from "../models/TVshows";
import TVshowGenres from "../models/TVshowGenres";
import { addAllTVPeople } from "./personController";
import { TVshowById, getAllPersonTVshows } from "../middleware/apiPuller";
import { addGenre, addTVshowGenres } from "./genreController";

/**
 * adds a TVshow to the database
 * also adds the corresponding people and genres with
 * proper checking to ensure no duplicates
 * @param TVshowId
 * @returns the TVshow object that was added or null if failed
 */
const addTVshow = async (TVshowId: string) => {
  try {
    //checks if TVshow is already in the database
    if ((await TVshow.findOne({ _id: TVshowId })) != null) {
      console.error("Error adding TVshow: TVshow already in database");
      return null;
    }
    //grabs all TVshow details from the API
    const show = await TVshowById(TVshowId);
    const newTVshow = new TVshow({
      _id: show.id,
      title: show.name,
      year: show.first_air_date,
      summary: show.overview,
      image_path: show.poster_path,
      seasons: show.number_of_seasons,
      episodes: show.number_of_episodes,
    });
    //add the TVshow to the database
    await newTVshow.save();

    //add all people(actors, directors, producers,writers) to the database
    //defined in personController
    addAllTVPeople(TVshowId);

    /*add genres to genre collection if not already there
        calls addGenre from genreController*/
    for (let genre of show.genres) {
      addGenre(genre.id, genre.name);
    }

    //add genre-TVshow pairs to TVshowGenres collection
    for (let genre of show.genres) {
      addTVshowGenres(TVshowId, genre.id);
    }
    return newTVshow;
  } catch (error) {
    console.error("Error adding TVshow", error);
    return null;
  }
};

/**
 * gets a TVshow by its id from the database
 * @param TVshowId
 * @returns the TVshow object or null if not found
 */
const getTVshow = async (TVshowId: string) => {
  try {
    const show = await TVshow.findOne({ _id: TVshowId });
    return show;
  } catch (error) {
    console.error("Error getting TVshow", error);
    return null;
  }
};

/**
 * deletes a TVshow from the database by its id
 * @param TVshowId
 * @returns true if successful, false if failed
 */
const deleteTVshow = async (TVshowId: string) => {
  try {
    await TVshow.deleteOne({ _id: TVshowId });
    await TVshowGenres.deleteMany({ tv_id: TVshowId });
    return true;
  } catch (error) {
    console.error("Error deleting TVshow", error);
    return false;
  }
}

/**
 * adds all TVshows by a given person to the database
 * calls getAllPersonTVshows to get the list of TVshows from apiPuller
 * @param personId
 * 
 */
//not tested yet
const addPersonTVshows = async (personId: string) => {
  try {
    //query the api for all TVshows related to the person
    const result = await getAllPersonTVshows(personId);
    //think we need this libe because AllPersonTVshows returns a list of TVshows as cast
    //objects by calling people/TVshowcredits, so we need to grab the cast field from the result
    const TVshows = result.cast;
    //add each TVshow to the database
    for (let TVshow of TVshows) {
      addTVshow(TVshow.id);
    }
  } catch (error) {
    console.error("Error adding TVshows", error);
  }
}

export { addTVshow, getTVshow, deleteTVshow, addPersonTVshows}
