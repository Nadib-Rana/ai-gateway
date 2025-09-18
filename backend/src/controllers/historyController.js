import QueryLog from "../models/QueryLog.js";

export const getHistory = async (req, res) => {
  try {
    const logs = await QueryLog.find().sort({ createdAt: -1 }).limit(20);
    res.json(logs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to fetch history" });
  }
};
