import mongoose from "mongoose";
const { Schema } = mongoose;

//listEntrySchema used to specify Movie or Tvshow and the id of the movie or tvshow in list
const ListEntrySchema = new Schema({
  itemType: {
    type: String,
    required: true,
    enum: ["Movie", "TVshow"],
  },
  item_id: {
    type: String,
    required: true,
    refPath: "entries.itemType",
  },
});

const ListSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  //an array of list entries, each entry is a movie or tvshow, the reference is determined by the itemType ref path
  entries: [ListEntrySchema],
});
//need to fix this, not lettign duplicate names different users right now
ListSchema.index({ name: 1, user_id: 1 }, { unique: true });

const List = mongoose.model("List", ListSchema);
export default List;
