import mockingoose from "mockingoose";
import Genre from "../../models/genre";
import { addGenre, addMovieGenres, getGenre,deleteGenre,deleteMovieGenre,addTVshowGenres } from "../../controllers/genreController";
//connect to the db before all tests
describe("add genre", () => {
    beforeAll(async () => {
       // mockingoose.resetAll();
    });
    it('should create a new genre if it does not exist', async () => {
        mockingoose(Genre).toReturn(null, 'findOne'); // Simulate no genre found
        const gId = '1';
        const gName = 'Action';
        
        const result = await addGenre(gId, gName);
    
        expect(result._id.toString()).toBe(gId);
        expect(result.name).toBe(gName);
        expect(Genre.prototype.save).toHaveBeenCalled(); // Check that save was called
      });
    
      it('should not create a new genre if it exists', async () => {
        const genreId = '1';  // Define genreId
        const genreName = 'Action';  // Define genreName
        // Mock findOne to return an existing genre
        mockingoose(Genre).toReturn({ _id: genreId, name: genreName }, 'findOne');
        // Attempt to add a genre that already exists
        const result = await addGenre(genreId, genreName);
        // Check that result is null, indicating no new genre was added
        expect(result).toBe(null);
    });
});

// //tests get genre function
// describe("get genre", () => {
//     beforeAll(async () => {
//         //mockingoose.resetAll();
//     });
//     //test that getGenre returns a genre if it exists
//     it('should return a genre if it exists', async () => {
//         const genreId = '1';
//         const genreName = 'Action';
//         mockingoose(Genre).toReturn({ _id: genreId, name: genreName }, 'findOne'); // Simulate genre found
//         const result = await getGenre(genreId);
//         expect(result.name).toBe(genreName);
//         expect(result._id).toBe(genreId);
//       });
//     //test that getGenre returns null if genre does not exist
//     it('should return null if genre does not exist', async () => {
//         const genreId = '1';
//         mockingoose(Genre).toReturn(null, 'findOne'); // Simulate genre not found
//         const result = await getGenre(genreId);
//         expect(result).toBe(null);
//       });
// });



// //tests deleet genre function
// describe("delete genre", () => {
//     beforeAll(async () => {
//         //mockingoose.resetAll();
//     });
//     //test that deleteGenre deletes a genre if it exists
//     it('should delete a genre if it exists', async () => {
//         const genreId = '1';
//         const genreName = 'Action';
//         mockingoose(Genre).toReturn({ _id: genreId, name: genreName }, 'findOne'); // Simulate genre found
//         mockingoose(Genre).toReturn({ _id: genreId, name: genreName }, 'remove'); // Simulate genre removed
//         const result = await deleteGenre(genreId);
//         expect(result).toBe(true);
//       });
//     //test that deleteGenre returns false if genre does not exist
//     it('should return false if genre does not exist', async () => {
//         const genreId = '1';
//         mockingoose(Genre).toReturn(null, 'findOne'); // Simulate genre not found
//         const result = await deleteGenre(genreId);
//         expect(result).toBe(false);
//       });
// });

// //tests addMovieGenres function
// describe("add movie genre", () => {
//     beforeAll(async () => {
//         //mockingoose.resetAll();
//     });
//     //test that addMovieGenres adds a movie genre pairing
//     it('should add a movie genre pairing', async () => {
//         const movieId = '1';
//         const genreId = '1';
//         mockingoose(Genre).toReturn({ _id: genreId }, 'findOne'); // Simulate genre found
//         const result = await addMovieGenres(movieId, genreId);
//         expect(result).toBe(undefined);
//       });
// });

// //tests deleteMovieGenre function
// describe("delete movie genre", () => {
//     beforeAll(async () => {
//         //mockingoose.resetAll();
//     });
//     //test that deleteMovieGenre deletes a movie genre pairing
//     it('should delete a movie genre pairing', async () => {
//         const movieId = '1';
//         const genreId = '1';
//         mockingoose(Genre).toReturn({ _id: genreId }, 'findOne'); // Simulate genre found
//         mockingoose(Genre).toReturn({ _id: genreId }, 'remove'); // Simulate genre removed
//         const result = await deleteMovieGenre(movieId, genreId);
//         expect(result).toBe(true);
//       });
// });

// //tests addTVshowGenres function
// describe("add tv genre", () => {
//     beforeAll(async () => {
//         //mockingoose.resetAll();
//     });
//     //test that addTVshowGenres adds a tv genre pairing
//     it('should add a tv genre pairing', async () => {
//         const TVshowId = '1';
//         const genreId = '1';
//         mockingoose(Genre).toReturn({ _id: genreId }, 'findOne'); // Simulate genre found
//         const result = await addTVshowGenres(TVshowId, genreId);
//         expect(result).toBe(undefined);
//       });
// });









