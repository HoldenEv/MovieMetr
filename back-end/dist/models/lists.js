"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
//listEntrySchema used to specify Movie or Tvshow and the id of the movie or tvshow in list
const ListEntrySchema = new Schema({
    itemType: {
        type: String,
        required: true,
        enum: ["Movie", "TVshow"],
    },
    item_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
const List = mongoose_1.default.model("List", ListSchema);
exports.default = List;
