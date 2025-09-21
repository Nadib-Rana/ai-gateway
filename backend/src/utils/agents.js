// agents.js
import fetch from "node-fetch";

/**
 * ================================
 *   AI PROVIDER FUNCTIONS
 * ================================
 */

// ----------------------
// Hugging Face: English → Bangla translation
// ----------------------
export const callHuggingFace = async (prompt) => {
  const url = "https://api-inference.huggingface.co/models/Helsinki-NLP/opus-mt-en-bn";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.HF_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputs: prompt }),
  });

  if (!res.ok) throw new Error(`HuggingFace: ${await res.text()}`);

  const data = await res.json();
  return data?.[0]?.translation_text ?? JSON.stringify(data);
};

// ----------------------
// OpenRouter: Free model
// ----------------------
export const callOpenRouter = async (prompt) => {
  const url = "https://openrouter.ai/api/v1/chat/completions";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "mistralai/mistral-7b-instruct:free", // working free model
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) throw new Error(`OpenRouter: ${await res.text()}`);

  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? JSON.stringify(data);
};

// ----------------------
// Gemini: Working model
// ----------------------
export const callGemini = async (prompt) => {
  const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });

  if (!res.ok) throw new Error(`Gemini: ${await res.text()}`);

  const data = await res.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text ?? JSON.stringify(data);
};
