import { useState } from "react";

export default function FeedbackButton() {
  const [feedback, setFeedback] = useState(null);

  const giveFeedback = (value) => {
    setFeedback(value);
    alert(`Thanks for your ${value} feedback!`);
  };

  return (
    <div className="mt-4 flex gap-2">
      <button
        onClick={() => giveFeedback("👍")}
        className={`px-3 py-1 rounded ${
          feedback === "👍" ? "bg-green-500 text-white" : "bg-gray-200"
        }`}
      >
        👍
      </button>
      <button
        onClick={() => giveFeedback("👎")}
        className={`px-3 py-1 rounded ${
          feedback === "👎" ? "bg-red-500 text-white" : "bg-gray-200"
        }`}
      >
        👎
      </button>
    </div>
  );
}
