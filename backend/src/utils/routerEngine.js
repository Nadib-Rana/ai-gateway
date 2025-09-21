import { callHuggingFace, callOpenRouter, callGemini } from "./agents.js";

export const askAI = async (prompt) => {
  try {
    return { reply: await callHuggingFace(prompt), provider: "huggingface" };
  } catch (err1) {
    try {
      return { reply: await callOpenRouter(prompt), provider: "openrouter" };
    } catch (err2) {
      return { reply: await callGemini(prompt), provider: "gemini" };
    }
  }
};

export const cleanReply = (text) => {
  if (!text) return "";
  return text
    .replace(/<[^>]*>/g, "")       // remove HTML/XML-like tags
    .replace(/\[\/?OUT\]/g, "")    // remove [OUT] or [/OUT]
    .trim();
};
