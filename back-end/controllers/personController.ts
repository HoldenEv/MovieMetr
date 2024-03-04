import Person from '../models/person';
import { personById, getAllPersonMovies} from '../middleware/apiPuller';
//if we want to add all movie a person was in to the database
import Movie from '../models/movies';

//adds person to the database by person Id, queires the api for the person's details
const addPerson = async (personId: string) => {
    try{
        //check if person is already in the database
        if (await Person.findOne({_id: personId}) != null){
            console.error("Error adding person: Person already in database");
            return null;
        }
        //query the api for the person's details
        const person = await personById(personId);
        //add the person to the database
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
        await newPerson.save();
        return newPerson;
    } catch (error){
        console.error("Error adding person", error);
        return null;
    }
}

//adds all people(writer,actor,producer,director) related to a movie to the database
const addMoviePeople = async (movieId: string) => {
    try{
        //query the api for all people related to the movie
        const people = await getAllPersonMovies(movieId);
        //add each person to the database
        for (let person of people){
            addPerson(person.id);
        }
    } catch (error){
        console.error("Error adding people", error);
    }
}

//deletes a person from the database by their id
const deletePerson = async (personId: string) => {
    try{
        await Person.deleteOne({_id: personId});
        return true;
    } catch (error){
        console.error("Error deleting person", error);
        return false;
    }
}

export{
    addPerson,addMoviePeople,deletePerson
}
