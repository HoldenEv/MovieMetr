import mongoose from "mongoose";
const { Schema } = mongoose;

const GenreSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const Genre = mongoose.models.Genre ||
mongoose.model("Genre", GenreSchema);
export default Genre;
