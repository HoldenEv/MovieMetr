"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePerson = exports.addAllMoviePeople = exports.addPerson = void 0;
const person_1 = __importDefault(require("../models/person"));
const moviePeople_1 = __importDefault(require("../models/moviePeople"));
const apiPuller_1 = require("../middleware/apiPuller");
//adds person to the database by person Id, queires the api for the person's details
const addPerson = (personId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //check if person is already in the database
        if ((yield person_1.default.findOne({ _id: personId })) != null) {
            console.error("Error adding person: Person already in database");
            return null;
        }
        //query the api for the person's details
        const person = yield (0, apiPuller_1.personById)(personId);
        //create the newPerson object
        const newPerson = new person_1.default({
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
        yield newPerson.save();
        return newPerson;
    }
    catch (error) {
        console.error("Error adding person", error);
        return null;
    }
});
exports.addPerson = addPerson;
//creates a moviePeople object in db given a personId and movieId
const addMoviePerson = (personId, movieId, department) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //create the newMoviePerson object
        const newMoviePerson = new moviePeople_1.default({
            person_id: personId,
            movie_id: movieId,
            department: department,
        });
        //add the moviePerson to the database
        yield newMoviePerson.save();
        return newMoviePerson;
    }
    catch (error) {
        console.error("Error adding moviePerson", error);
        return null;
    }
});
//adds all people(writer,actor,producer,director) related to a movie to the database
const addAllMoviePeople = (movieId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //query the api for all people related to the movie
        //getAllMoviePeople returns a json object.data,which holds cast objects for each relavent person
        const people = yield (0, apiPuller_1.getAllMoviePeople)(movieId);
        //add each person to the database
        for (let person of people) {
            //check if person is already in the database
            if ((yield person_1.default.findOne({ _id: person.id })) == null) {
                yield addPerson(person.id);
            }
            //add the person to the moviePeople collection
            //no need to check only called upon insertion of a new movie
            //pairing is guarunteed unique
            yield addMoviePerson(person.id, movieId, person.known_for_department);
        }
    }
    catch (error) {
        console.error("Error adding people", error);
    }
});
exports.addAllMoviePeople = addAllMoviePeople;
//deletes a person from the database by their id
const deletePerson = (personId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield person_1.default.deleteOne({ _id: personId });
        return true;
    }
    catch (error) {
        console.error("Error deleting person", error);
        return false;
    }
});
exports.deletePerson = deletePerson;
