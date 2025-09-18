import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  passwordHash: String // store hashed password if you implement auth
}, { timestamps: true });

export default mongoose.model("User", userSchema);
