import mongoose from "mongoose";
import userSchema from "./user";

const entrySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"],
    unique: [true, "title already exists"],
  },
  body: {
    type: String,
    required: [true, "body is required"],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
  },
  private: {
    type: Boolean,
  },
});

export default mongoose.models.entry || mongoose.model("entry", entrySchema);
