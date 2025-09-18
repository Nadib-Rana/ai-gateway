export const chooseAPI = (query) => {
  if (!query || typeof query !== "string") return "HuggingFace";
  const q = query.toLowerCase();

  // basic rules — extend as needed
  if (/\b(translate|language|translate to|অনুবাদ|ভাষা)\b/.test(q)) return "HuggingFace";
  if (/\b(code|programming|javascript|python|bug|compile)\b/.test(q)) return "OpenRouter";
  if (/\b(summary|summarize|short|explain in simple)\b/.test(q)) return "Gemini";

  return "HuggingFace";
};
