import mongoose from "mongoose";
const { Schema } = mongoose;

const TVshowGenresSchema = new Schema({
  TVshow_id: {
    type: String,
    required: true,
    ref: "TVshow",
  },
  genre_id: {
    type: String,
    required: true,
    ref: "Genre",
  },
});

const TVshowGenres = mongoose.model("TVshowGenres", TVshowGenresSchema);
export default TVshowGenres;
