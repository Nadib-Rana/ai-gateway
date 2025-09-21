// rsc/routes/historyRoutes


import express from "express";
import { getHistory } from "../controllers/historyController.js";
import { addFeedback } from "../controllers/feedbackController.js";

const router = express.Router();

router.get("/history", getHistory);
router.post("/feedback", addFeedback);

export default router;
