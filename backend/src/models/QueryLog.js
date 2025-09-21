import mongoose from "mongoose";

const queryLogSchema = new mongoose.Schema({
  prompt: { type: String, required: true },
  reply: { type: String },
  provider: { 
    type: String, 
    enum: ["huggingface", "openrouter", "gemini", "all_failed"], // ✅ added all_failed
    required: true 
  },
  success: { type: Boolean, default: true },
  error: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("QueryLog", queryLogSchema);
