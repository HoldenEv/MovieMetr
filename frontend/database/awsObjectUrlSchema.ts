import mongoose, { Schema } from "mongoose";

export type awsImageUrl = {
  objectUrl: string;
  
};

const awsObjectUrlSchema = new Schema<awsImageUrl>({
  objectUrl: { type: String, required: true, unique: false },
});

const awsObjectUrl = mongoose.models["awsObjectUrl"] || mongoose.model("awsObjectUrl", awsObjectUrlSchema);

export default awsObjectUrl;