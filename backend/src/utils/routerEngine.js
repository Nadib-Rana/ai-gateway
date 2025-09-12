export const chooseAPI = (query) => {
  // Example rule-based routing
  if (/translate|language/i.test(query)) return "HuggingFace";
  if (/code|programming/i.test(query)) return "OpenRouter";
  return "HuggingFace"; // default
};
