import e from "express";
import mongoose from "mongoose";
const { Schema } = mongoose;

const personSchema = new Schema({
    //overwrite the default _id field with the person_id field so we can use the TMDB id as the primary key
    _id:{
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    biography: {
        type: String,
        required: true,
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
    department:{
        type: String,
        required: true,
    },
    //list of movies the person is known for, field from api search people, only a few movies
    //then click a button to see more, which calls function to query all movies for person
    //from apiPuller
    known_for:[{type:mongoose.Schema.Types.ObjectId, ref:'Movie'}],
});

const Person = mongoose.model('Person', personSchema);
export default Person;