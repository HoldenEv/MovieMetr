"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
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
    genres: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Genre" }],
});
const TVshow = mongoose_1.default.model("TVshow", TVshowSchema);
exports.default = TVshow;
