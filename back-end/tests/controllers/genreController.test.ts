import { addGenre, addMovieGenres, getGenre,deleteGenre,deleteMovieGenre, } from "../../controllers/genreController";
const mongoose = require("mongoose");
import * as dotenv from "dotenv";
dotenv.config();
//connect to the db before all tests
beforeAll(async () => {
    await mongoose.connect(process.env.URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

//disconnect from the db after all tests
afterAll(async () => {
    await mongoose.disconnect();
});

//tests add and get genre functions
test("addGenre and getGenre", async () => {
    const genreId = "1";
    const genreName = "Boring Movie";
    const add= await addGenre(genreId, genreName);
    const result = await getGenre(genreId);
    expect(result.name).toBe(genreName);
    expect(result._id).toBe(genreId);
});

//tests deleet genre function
test("deleteGenre", async () => {
    const genreId = "1";
    await deleteGenre(genreId);
    const result = await getGenre(genreId);
    expect(result).toBe(null);
});

//tests add movie genre function and delete movie genre function
test("addMovieGenres and delete", async () => {
    const movieId = "1";
    const genreId = "1";
    await addMovieGenres(movieId, genreId);
    const result = await deleteMovieGenre(movieId, genreId);
    expect(result).toBe(true);
});

//tests add a genre that already exists in database, should return null
test("addGenre", async () => {
    const genreId = "1";
    const genreName = "Boring Movie";
    const result = await addGenre(genreId, genreName);
    const result2 = await addGenre(genreId, genreName);
    expect(result2).toBe(null);
});







