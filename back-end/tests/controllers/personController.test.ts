import mongoose from 'mongoose';
import { addPerson, addAllMoviePeople, addAllTVPeople, deletePerson } 
from '../../controllers/personController';
import {MongoMemoryServer} from 'mongodb-memory-server';
import Person from '../../models/person';
import Movie from '../../models/movies';
import TVshow from '../../models/TVshows';
import { getAllMoviePeople, getAllTVPeople, personById } from '../../middleware/apiPuller';
let mongoServer: MongoMemoryServer;

jest.mock('../../middleware/apiPuller' , () => ({
    personById: jest.fn(),
    getAllMoviePeople: jest.fn(),
    getAllTVPeople: jest.fn()
}));
beforeAll(async () => {
    mongoServer= await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
    });
  
afterAll(async () => {
await mongoose.connection.dropDatabase();
await mongoose.connection.close();
await mongoServer.stop();
});
const personData = 
    {id: '1', 
    name: 'John Doe', 
    known_for_department: 'acting',
    biography: 'A great actor',
    birthday: '01-01-2000',
    gender: "male",
    place_of_birth: 'New York',
    profile_path: 'profile.jpg'};

    const moviePeopleData =[{id: '1', 
    name: 'John Doe', 
    known_for_department: 'acting',
    biography: 'A great actor',
    birthday: '01-01-2000',
    gender: "male",
    place_of_birth: 'New York',
    profile_path: 'profile.jpg'}];

//test addPerson
describe('addPerson', () => {
    beforeEach(async () => {
        await Person.deleteMany({});
        });
    it('should add a person to the database', async () => {
        //mock the personById call in addPerson to return a person json object
        (personById as jest.Mock).mockResolvedValue(personData);
        const person = await addPerson("1");
        expect(person).not.toBeNull();
    });

    it('should return null if the person already exists', async () => {
        await addPerson("1");
        const person = await addPerson("1");
        expect(person).toBeNull();
    });

    //checks that the error in the catch block is logged, mock findone to do so
    it('should log an error if the person cannot be added', async () => {
        // Spy on console.error
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        //mock the personById call in addPerson to throw an error
        (personById as jest.Mock).mockRejectedValue(new Error('error'));
        const result = await addPerson("1");
        expect(result).toBeNull();
        expect(consoleSpy).toHaveBeenCalledWith("Error adding person", new Error('error'));
        consoleSpy.mockRestore();
    });
});

//test addAllMoviePeople
describe('addAllMoviePeople', () => {
    beforeEach(async () => {
        await Person.deleteMany({});
        await Movie.deleteMany({});
        });
    it('should add all movie people to the database', async () => {
        //mock the getAllMoviePeople call in addAllMoviePeople to return a json object
        (getAllMoviePeople as jest.Mock).mockResolvedValue(moviePeopleData);
        //mock the personById call in addPerson to return a person json object
        (personById as jest.Mock).mockResolvedValue(personData);
        await addAllMoviePeople("1");
        const person = await Person.findOne({ _id: "1" });
        expect(person).not.toBeNull();
    });
    //error adding people, mock getAllMoviePeople to throw an error
    it('should log an error if the people cannot be added', async () => {
        // Spy on console.error
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        //mock the getAllMoviePeople call in addAllMoviePeople to throw an error
        (getAllMoviePeople as jest.Mock).mockRejectedValue(new Error('error'));
        const result = await addAllMoviePeople("1");
        expect(result).toBeUndefined();
        expect(consoleSpy).toHaveBeenCalledWith("Error adding people", new Error('error'));
        consoleSpy.mockRestore();
    });
});
//test addAllTVPeople
describe('addAllTVPeople', () => {
    beforeEach(async () => {
        await Person.deleteMany({});
        await TVshow.deleteMany({});
        });
    it('should add all TV people to the database', async () => {
        //mock the getAllMoviePeople call in addAllTVPeople to return a json object
        (getAllTVPeople as jest.Mock).mockResolvedValue(moviePeopleData);
        //mock the personById call in addPerson to return a person json object
        (personById as jest.Mock).mockResolvedValue(personData);
        await addAllTVPeople("1");
        const person = await Person.findOne({ _id: "1" });
        expect(person).not.toBeNull();
    });
    //error adding people, mock getAllMoviePeople to throw an error
    it('should log an error if the people cannot be added', async () => {
        // Spy on console.error
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        //mock the getAllMoviePeople call in addAllTVPeople to throw an error
        (getAllTVPeople as jest.Mock).mockRejectedValue(new Error('error'));
        const result = await addAllTVPeople("1");
        expect(result).toBeUndefined();
        expect(consoleSpy).toHaveBeenCalledWith("Error adding people", new Error('error'));
        consoleSpy.mockRestore();
    });
});

//test deletePerson
describe('deletePerson', () => {
    beforeEach(async () => {
        await Person.deleteMany({});
        });
    it('should delete a person from the database', async () => {
        await addPerson("1");
        await deletePerson("1");
        const person = await Person.findOne({ _id: "1" });
        expect(person).toBeNull();
    });
    it('should log an error if the person cannot be deleted', async () => {
        // Spy on console.error
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        //mock the deleteOne call in deletePerson to throw an error
        jest.spyOn(Person, 'deleteOne').mockImplementation(() => { throw new Error('error'); });
        const result = await deletePerson("1");
        expect(result).toBeFalsy();
        expect(consoleSpy).toHaveBeenCalledWith("Error deleting person", new Error('error'));
        consoleSpy.mockRestore();
    });
});