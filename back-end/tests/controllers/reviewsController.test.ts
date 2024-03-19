import {addReview, deleteReview, getMovieReviews, getUserReviews,getReview } from "../../controllers/reviewsController";
import { addMovie,deleteMovie } from "../../controllers/movieController";
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


