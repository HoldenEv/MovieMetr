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
  summary: {
    type: String,
    required: true,
  },
  image_path: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  seasons: {
    type: Number,
    required: true,
  },
  episodes: {
    type: Number,
    required: true,
  },
});

const TVshow = mongoose.model("TVshow", TVshowSchema);
export default TVshow;
