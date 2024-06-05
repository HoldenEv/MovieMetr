import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Genre from '../../models/genre';
import { MongoMemoryServer } from 'mongodb-memory-server';
import TVshowGenres from '../../models/TVshowGenres';
import MovieGenres from '../../models/movieGenres';
import { addGenre, addMovieGenres, addTVshowGenres, getGenre, deleteGenre, deleteMovieGenre }
from '../../controllers/genreController';
import Movie from '../../models/movies';
import { assert } from 'node:console';
dotenv.config();
let mongoServer: MongoMemoryServer;
//as of now make sure to spin up the db at localhost:27017 before testing
//may be able to get the script to do this
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
      });
    //test addMovieGenres console error with save error
    it('should console.error if the movie genre already exists', async () => {
      await addGenre("1", 'Action');
      await addMovieGenres("1", "1");
      //mock save to throw an error
      jest.spyOn(MovieGenres.prototype, 'save').mockImplementation(() => { throw new Error('save error'); });
      // Spy on console.error
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      await addMovieGenres("1", "1");
      expect(consoleSpy).toHaveBeenCalledWith("Error adding movie genre", new Error('save error'));
      }
    );
  });

  //test getGenre
  describe('getGenre', () => {
    beforeEach(async () => {
      await Genre.deleteMany({});
      await TVshowGenres.deleteMany({});
      await Movie.deleteMany({});
      });

    it('should get a genre by its id from the database', async () => {
      await addGenre("1", 'Action');
      const genre = await getGenre("1");
      assert(genre !== null);
      });
    it('should return null if the genre does not exist', async () => {
      const genre = await getGenre("1");
      assert(genre === null);
      });
    it('should log an error if the genre cannot be found', async () => {
      // Spy on console.error
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      // Mock the findOne method to throw an error
      jest.spyOn(Genre, 'findOne').mockImplementation(() => { throw new Error('findOne error'); });
      const result = await getGenre('1');
      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith("Error getting genre", new Error('findOne error'));
      consoleSpy.mockRestore();
      });
    });

    //test deleteGenre
    describe('deleteGenre', () => {
      beforeEach(async () => {
        await Genre.deleteMany({});
        await TVshowGenres.deleteMany({});
        await Movie.deleteMany({});
        });

      it('should delete a genre by its id', async () => {
        await addGenre("1", 'Action');
        await deleteGenre("1");
        const genre = await getGenre("1");
        assert(genre === null);
        });
      it('should log an error if the genre cannot be deleted', async () => {
        // Spy on console.error
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        // Mock the deleteOne method to throw an error
        jest.spyOn(Genre, 'deleteOne').mockImplementation(() => { throw new Error('deleteOne error'); });
        await deleteGenre('1');
        expect(consoleSpy).toHaveBeenCalledWith("Error deleting genre", new Error('deleteOne error'));
        consoleSpy.mockRestore();
        });
      });

      //test deleteMovieGenre
      describe('deleteMovieGenre', () => {
        beforeEach(async () => {
          await Genre.deleteMany({});
          await TVshowGenres.deleteMany({});
          await Movie.deleteMany({});
          });

        it('should delete a movie genre pairing by its id', async () => {
          await addGenre("1", 'Action');
          //await addMovie("1");
          await addMovieGenres("1", "1");
          await deleteMovieGenre("1", "1");
          const movieGenre = await MovieGenres.findOne({ movie_id: "1", genre_id: "1" });
          assert(movieGenre === null);
          });
        it('should log an error if the movie genre cannot be deleted', async () => {
          // Spy on console.error
          const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
          // Mock the deleteOne method to throw an error
          jest.spyOn(MovieGenres, 'deleteOne').mockImplementation(() => { throw new Error('deleteOne error'); });
          await deleteMovieGenre('1', '1');
          expect(consoleSpy).toHaveBeenCalledWith("Error deleting movie genre", new Error('deleteOne error'));
          consoleSpy.mockRestore();
          });
      });

      //test addTVshowGenres
      describe('addTVshowGenres', () => {
        beforeEach(async () => {
          await Genre.deleteMany({});
          await TVshowGenres.deleteMany({});
          await Movie.deleteMany({});
          });

        it('should add a tv genre pairing to the database', async () => {
          await addGenre("1", 'Action');
          await addTVshowGenres("1", "1");
          const tvGenre = await TVshowGenres.findOne({ TVshow_id: "1", genre_id: "1" });
          assert(tvGenre !== null);
          });
        it('should console.error if the tv genre already exists', async () => {
          await addGenre("1", 'Action');
          await addTVshowGenres("1", "1");
          //mock save to throw an error
          jest.spyOn(TVshowGenres.prototype, 'save').mockImplementation(() => { throw new Error('save error'); });
          // Spy on console.error
          const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
          await addTVshowGenres("1", "1");
          expect(consoleSpy).toHaveBeenCalledWith("Error adding tv genre", new Error('save error'));
          }
        );
    });
});
  
