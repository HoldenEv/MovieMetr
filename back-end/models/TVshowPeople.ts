// schema to map tv_id's to a person's id,
// allowing for querying all tv shows a person is in, and all people in a tv show,

import mongoose from "mongoose";
const { Schema } = mongoose;

const tvShowPeopleSchema = new Schema({
  TVshow_id: {
    type: String,
    required: true,
    ref: "TVshow",
  },
  person_id: {
    type: String,
    required: true,
    ref: "Person",
  },
  //so we can also specify the department of the person in the tv show, when querying all people in a tv show
  department: {
    type: String,
    required: true,
  },
});
const TVshowPeople = mongoose.models.TVshowPeople ||
mongoose.model("TVshowPeople", tvShowPeopleSchema);
export default TVshowPeople;
