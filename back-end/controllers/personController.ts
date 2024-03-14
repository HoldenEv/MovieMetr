import Person from "../models/person";
import MoviePeople from "../models/moviePeople";
import { personById, getAllMoviePeople } from "../middleware/apiPuller";
//if we want to add all movie a person was in to the database
import Movie from "../models/movies";

//adds person to the database by person Id, queires the api for the person's details
const addPerson = async (personId: string) => {
  try {
    //check if person is already in the database
    if ((await Person.findOne({ _id: personId })) != null) {
      console.error("Error adding person: Person already in database");
      return null;
    }
    //query the api for the person's details
    const person = await personById(personId);
    //create the newPerson object
    const newPerson = new Person({
      _id: person.id,
      name: person.name,
      biography: person.biography,
      birthday: person.birthday,
      department: person.known_for_department,
      gender: person.gender,
      place_of_birth: person.place_of_birth,
      profile_path: person.profile_path,
    });
    //add the person to the database
    await newPerson.save();
    return newPerson;
  } catch (error) {
    console.error("Error adding person", error);
    return null;
  }
};

//creates a moviePeople object in db given a personId and movieId
const addMoviePerson = async (
  personId: string,
  movieId: string,
  department: string,
) => {
  try {
    //create the newMoviePerson object
    const newMoviePerson = new MoviePeople({
      person_id: personId,
      movie_id: movieId,
      department: department,
    });
    //add the moviePerson to the database
    await newMoviePerson.save();
    return newMoviePerson;
  } catch (error) {
    console.error("Error adding moviePerson", error);
    return null;
  }
};

//adds all people(writer,actor,producer,director) related to a movie to the database
const addAllMoviePeople = async (movieId: string) => {
  try {
    //query the api for all people related to the movie
    //getAllMoviePeople returns a json object.data,which holds cast objects for each relavent person
    const people = await getAllMoviePeople(movieId);
    //add each person to the database
    for (let person of people) {
      //check if person is already in the database
      if ((await Person.findOne({ _id: person.id })) == null) {
        await addPerson(person.id);
      }
      //add the person to the moviePeople collection
      //no need to check only called upon insertion of a new movie
      //pairing is guarunteed unique
      await addMoviePerson(person.id, movieId, person.known_for_department);
    }
  } catch (error) {
    console.error("Error adding people", error);
  }
};

//deletes a person from the database by their id
const deletePerson = async (personId: string) => {
  try {
    await Person.deleteOne({ _id: personId });
    return true;
  } catch (error) {
    console.error("Error deleting person", error);
    return false;
  }
};

export { addPerson, addAllMoviePeople, deletePerson };
