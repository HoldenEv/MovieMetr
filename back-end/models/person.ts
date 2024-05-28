import mongoose from "mongoose";
const { Schema } = mongoose;

/* might want to add a moviePerson model to store the relationship between movies and people
would allow for querying all movies a person is in, and all people in a movie, 
regardless of department, the filter by department*/
/*only thing holding me back from that now is that the database will only contain 
a limited number of movies and people, so it might be better to just query the api
each time we need to get all movies a person is in, or all people in a movie*/
/*however it may be a good idea to insert all people and movies into the database
upon entry of any movie or person, so that we can query the database for all movies a person is in*/

const personSchema = new Schema({
  //overwrite the default _id field with the person_id field so we can use the TMDB id as the primary key
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  biography: {
    type: String,
  },
  birthday: {
    type: String,
  },
  gender: {
    type: String,
  },
  place_of_birth: {
    type: String,
  },
  profile_path: {
    type: String,
  },
  //ie. actor, director, producer, etc
  department: {
    type: String,
    required: true,
  },
});

const Person = mongoose.models.Person ||
mongoose.model("Person", personSchema);
export default Person;
