import QueryLog from "../models/QueryLog.js";
import { askAI } from "../utils/routerEngine.js";

export const handleAsk = async (req, res) => {
  const { prompt } = req.body;
  try {
    const { reply, provider } = await askAI(prompt);

    const log = await QueryLog.create({ prompt, reply, provider, success: true });
    res.json({ reply, provider });
  } catch (error) {
    await QueryLog.create({ prompt, provider: "all_failed", success: false, error: error.message });
    res.status(500).json({ error: "All providers failed", details: error.message });
  }
};
