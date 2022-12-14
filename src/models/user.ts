import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true],
  },
  email: {
    type: String,
    required: [true],
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
