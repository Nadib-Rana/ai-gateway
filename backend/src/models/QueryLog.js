import mongoose from "mongoose";

const queryLogSchema = new mongoose.Schema(
  {
    query: { type: String, required: true },
    mode: { type: String, enum: ["broadcast", "smart"], default: "broadcast" },
    responses: {
      huggingface: { type: String, default: "" },
      openrouter: { type: String, default: "" },
      gemini: { type: String, default: "" }
    }
  },
  { timestamps: true }
);

export default mongoose.model("QueryLog", queryLogSchema);
