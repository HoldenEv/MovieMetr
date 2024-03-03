import mongoose, { Schema, Document } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
}

const UserSchema = new Schema<IUser>({
  //needs to be unique, will 
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

});

UserSchema.plugin(passportLocalMongoose);

const UserModel = mongoose.model<IUser>('User', UserSchema);
export default UserModel;