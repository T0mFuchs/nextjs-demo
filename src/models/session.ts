import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  sessionToken: {
    type: String,
    required: true,
    unique: true,
    length: 37,
  },
  userId: {
    type: ObjectId,
    required: true,
  },
  expires: {
    type: Date,
    required: true,
  },
});

export default mongoose.models.session ||
  mongoose.model("session", sessionSchema);
