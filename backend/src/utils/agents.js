import fetch from "node-fetch";

/**
 * Each function returns a string reply or throws on HTTP-level error.
 * All models used are free-tier and publicly accessible.
 */

// ✅ Hugging Face — using public model: flan-t5-base
export const callHuggingFace = async (prompt) => {
  const url = "https://api-inference.huggingface.co/models/google/flan-t5-base";
  console.log("Calling HuggingFace with prompt:", prompt);

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.HF_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ inputs: prompt })
  });

  console.log("HuggingFace response status:", res.status);

  if (!res.ok) {
    const txt = await res.text();
    console.error("HuggingFace error response:", txt);
    throw new Error(`HuggingFace error ${res.status}: ${txt}`);
  }

  const data = await res.json();
  console.log("HuggingFace response data:", data);

  if (Array.isArray(data) && data[0]?.generated_text) return data[0].generated_text;
  if (data.generated_text) return data.generated_text;
  return JSON.stringify(data); // fallback: return raw response
};

// ✅ OpenRouter — using free model: openchat/openchat-3.5
export const callOpenRouter = async (prompt) => {
  const url = "https://openrouter.ai/api/v1/chat/completions";
  console.log("Calling OpenRouter with prompt:", prompt);

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "openchat/openchat-3.5",
      messages: [{ role: "user", content: prompt }]
    })
  });

  console.log("OpenRouter response status:", res.status);

  if (!res.ok) {
    const txt = await res.text();
    console.error("OpenRouter error response:", txt);
    throw new Error(`OpenRouter error ${res.status}: ${txt}`);
  }

  const data = await res.json();
  console.log("OpenRouter response data:", data);

  return data.choices?.[0]?.message?.content ?? JSON.stringify(data);
};

// ✅ Gemini — using updated model: gemini-2.5-flash-lite with v1 endpoint
export const callGemini = async (prompt) => {
  const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`;
  console.log("Calling Gemini with prompt:", prompt);

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  });

  console.log("Gemini response status:", res.status);

  if (!res.ok) {
    const txt = await res.text();
    console.error("Gemini error response:", txt);
    throw new Error(`Gemini error ${res.status}: ${txt}`);
  }

  const data = await res.json();
  console.log("Gemini response data:", data);

  return data?.candidates?.[0]?.content?.parts?.[0]?.text ?? JSON.stringify(data);
};