import express from "express";
import { handleQuery } from "../controllers/askController.js";

const router = express.Router();

router.post("/ask", handleQuery);

export default router;
