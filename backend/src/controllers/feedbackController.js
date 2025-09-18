import QueryLog from "../models/QueryLog.js";

export const addFeedback = async (req, res) => {
  const { logId, api, feedback } = req.body;

  try {
    const log = await QueryLog.findById(logId);
    if (!log) return res.status(404).json({ error: "Log not found" });

    const responseObj = log.responses.find(r => r.api === api);
    if (responseObj) {
      responseObj.feedback = feedback;
      await log.save();
    }

    res.json({ success: true, log });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update feedback" });
  }
};
