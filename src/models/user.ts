import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "username already exists"],
  },
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: [true, "email already exists"],
  },
  image: {
    type: String,
  },
  emailVerified: {
    type: Boolean,
  },
});

export default mongoose.models.user || mongoose.model("user", userSchema);
