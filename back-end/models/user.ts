import mongoose, { Schema, Document } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

export interface IUser extends Document {
  changePassword(
    oldPassword: string,
    newPassword: string,
    callback: (err: any) => void,
  ): void;
  authenticate(
    password: string,
    callback: (err: any, result: any) => void,
  ): void;
  username: string;
  email: string;
  profilePath: string;
  bio: string;
  following: string[];
  followers: string[];
  favoriteMovies: string[];
}

const UserSchema = new Schema<IUser>({
  //needs to be unique
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profilePath: {
    type: String,
  },
  bio: {
    type: String,
  },
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  favoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
});

UserSchema.plugin(passportLocalMongoose);

const UserModel = mongoose.model<IUser>("User", UserSchema);

export default UserModel;
