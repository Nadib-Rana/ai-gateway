export default function MessageBubble({ role, text }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-lg px-4 py-2 rounded-2xl shadow ${
          isUser ? "bg-chat-user text-stone-500" : "bg-chat-ai text-gray-900"
        }`}
      >
        {text}
      </div>
    </div>
  );
}
