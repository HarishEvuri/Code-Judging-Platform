import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, index: true },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true, index: true },
    passwordHash: { type: String, required: true },
    avatar: { type: String },
    dob: { type: Date },
    solvedProblems: { type: Array, default: [] },
  },
  {
    timestamps: { createdAt: true },
  }
);

const User = mongoose.model("User", userSchema);

export default User;
