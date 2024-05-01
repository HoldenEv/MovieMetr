import mongoose, { Schema, Document, PassportLocalModel } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

interface IUserModel extends PassportLocalModel<IUser> {
  verifyUser(email: string, password: string): Promise<IUser | null>;
}

export interface IUser extends Document {
  changePassword(
    oldPassword: string,
    newPassword: string,
    callback: (err: Error | null) => void,
  ): void;
  authenticate(
    password: string,
    callback: (err: Error | null, result: boolean) => void,
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

const UserModel = mongoose.model<IUser, IUserModel>("User", UserSchema);

export default UserModel;
