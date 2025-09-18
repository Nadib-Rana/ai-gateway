import { callHuggingFace, callOpenRouter, callGemini } from "../utils/agents.js";
import QueryLog from "../models/QueryLog.js";
import { chooseAPI } from "../utils/routerEngine.js";

/**
 * POST /api/ask
 * body: { query: string, mode?: "broadcast"|"smart" }
 */
export const askAI = async (req, res) => {
  try {
    const { query, mode = "broadcast" } = req.body;
    if (!query || typeof query !== "string") return res.status(400).json({ error: "Query is required" });

    if (mode === "smart") {
      // choose one API
      const selected = chooseAPI(query);
      let reply = "";
      try {
        if (selected === "HuggingFace") reply = await callHuggingFace(query);
        else if (selected === "OpenRouter") reply = await callOpenRouter(query);
        else if (selected === "Gemini") reply = await callGemini(query);
        else reply = await callHuggingFace(query);
      } catch (err) {
        reply = `❌ Error: ${err.message}`;
      }

      const responses = {
        huggingface: selected === "HuggingFace" ? reply : "",
        openrouter: selected === "OpenRouter" ? reply : "",
        gemini: selected === "Gemini" ? reply : ""
      };

      const log = new QueryLog({ query, mode, responses });
      await log.save();

      return res.json({ query, mode, responses });
    }

    // broadcast mode: call all agents in parallel, but handle per-agent errors
    const results = await Promise.allSettled([
      callHuggingFace(query),
      callOpenRouter(query),
      callGemini(query)
    ]);

    const responses = {
      huggingface: results[0].status === "fulfilled" ? results[0].value : `❌ ${results[0].reason?.message || "HF error"}`,
      openrouter: results[1].status === "fulfilled" ? results[1].value : `❌ ${results[1].reason?.message || "OpenRouter error"}`,
      gemini: results[2].status === "fulfilled" ? results[2].value : `❌ ${results[2].reason?.message || "Gemini error"}`
    };

    const log = new QueryLog({ query, mode, responses });
    await log.save();

    return res.json({ query, mode, responses });
  } catch (err) {
    console.error("askAI controller error:", err);
    return res.status(500).json({ error: err.message || "Server error" });
  }
};
