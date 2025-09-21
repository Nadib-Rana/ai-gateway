import { useState } from "react";
import axios from "axios";
import MessageBubble from "./MessageBubble";

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!query.trim()) return;

    // Add user message
    const newMessages = [...messages, { role: "user", text: query }];
    setMessages(newMessages);
    setQuery("");
    setLoading(true);

    try {
      // Corrected: send { prompt } instead of { query }
      const res = await axios.post("/api/ask", { prompt: query });

      // Corrected: read response from res.data.reply
      const aiReply = res.data.reply || "⚠️ No response";

      setMessages([...newMessages, { role: "ai", text: aiReply }]);
    } catch (err) {
      setMessages([...newMessages, { role: "ai", text: "❌ Error fetching response" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat area */}
      <div className="flex-1 overflow-y-auto p-6">
        {messages.map((msg, i) => (
          <MessageBubble key={i} role={msg.role} text={msg.text} />
        ))}
        {loading && <MessageBubble role="ai" text="Thinking..." />}
      </div>

      {/* Input area */}
      <div className="p-4 border-t bg-white flex gap-2">
        <input
          type="text"
          className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
          placeholder="Send a message..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}
