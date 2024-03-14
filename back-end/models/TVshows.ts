import mongoose from "mongoose";
const { Schema } = mongoose;

const TVshowSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  overview: {
    type: String,
    required: true,
  },
  poster_path: {
    type: String,
  },
  //list of genre ids
  genres: [{ type: mongoose.Schema.Types.ObjectId, ref: "Genre" }],
});

const TVshow = mongoose.model("TVshow", TVshowSchema);
export default TVshow;
