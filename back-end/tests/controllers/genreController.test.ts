import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Genre from '../../models/genre';
import TVshowGenres from '../../models/TVshowGenres';
import { addGenre, addMovieGenres, addTVshowGenres, getGenre, deleteGenre, deleteMovieGenre }
from '../../controllers/genreController';
import { dot } from 'node:test/reporters';
import { before } from 'node:test';
import Movie from '../../models/movies';
import { assert } from 'node:console';
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
});
  
