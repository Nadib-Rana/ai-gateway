import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import askRoutes from "./routes/askRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Basic health route
app.get("/", (req, res) => res.send("AI Gateway Backend is up"));

// API routes
app.use("/api", askRoutes);

// Connect DB and start server
const PORT = process.env.PORT || 5000;
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
  });
