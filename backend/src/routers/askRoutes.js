import express from "express";
import { handleAsk } from "../controllers/askController.js";

const router = express.Router();

router.post("/", handleAsk);

export default router;
