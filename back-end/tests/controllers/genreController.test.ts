import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Genre from '../../models/genre';
import TVshowGenres from '../../models/TVshowGenres';
import MovieGenres from '../../models/movieGenres';
import { addGenre, addMovieGenres, addTVshowGenres, getGenre, deleteGenre, deleteMovieGenre }
from '../../controllers/genreController';
import { addMovie } from '../../controllers/movieController';
import { dot } from 'node:test/reporters';
import { before } from 'node:test';
import Movie from '../../models/movies';
import { assert } from 'node:console';
import exp from 'node:constants';
dotenv.config();
//as of now make sure to spin up the db at localhost:27017 before testing
//may be able to get the script to do this
beforeAll(async () => {
  await mongoose.connect(process.env.TESTURI as string);
  });

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  });

//test addGenre
describe('addGenre', () => {
  beforeEach(async () => {
    await Genre.deleteMany({});
    await TVshowGenres.deleteMany({});
    await Movie.deleteMany({});
    });

  it('should add a genre to the database', async () => {
    const genre = await addGenre("1", 'Action');
    assert(genre !== null);
    }
  );


  it('should return null if the genre already exists', async () => {
    await addGenre("1", 'Action');
    const genre = await addGenre("1", 'Action');
    assert(genre === null);
    }
  );
  it('should return null if the genre already exists', async () => {
    const genreId = '1';
    const genreName = 'Action';
    await addGenre(genreId, genreName);
    // Spy on console.error
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const result = await addGenre(genreId, genreName);
    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith("Error adding genre: Genre already in database");
    consoleSpy.mockRestore();
    });
  //checks that the error in the catch block is logged, mock findone to do so
  it('should log an error if the genre cannot be added', async () => {
    // Spy on console.error
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    // Mock the findOne method to throw an error
    jest.spyOn(Genre, 'findOne').mockImplementation(() => { throw new Error('findOne error'); });
    const result = await addGenre('1', 'Action');
    expect(result).toBeUndefined();
    expect(consoleSpy).toHaveBeenCalledWith("Error adding genre", new Error('findOne error'));
    consoleSpy.mockRestore();
    });

  //test addMovieGenres
  describe('addMovieGenres', () => {
    beforeEach(async () => {
      await Genre.deleteMany({});
      await TVshowGenres.deleteMany({});
      await Movie.deleteMany({});
      });

    it('should add a movie genre pairing to the database', async () => {
      await addGenre("1", 'Action');
      //await addMovie("1");
      await addMovieGenres("1", "1");
      const movieGenre = await MovieGenres.findOne({ movie_id: "1", genre_id: "1" });
      assert(movieGenre !== null);
      }
    );
  });
});
  
