import { useEffect, useState } from "react";
import axios from "axios";

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios
      .get("/api/history")
      .then((res) => setHistory(res.data))
      .catch(() => setHistory([]));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Query History</h1>
      {history.length === 0 ? (
        <p>No history yet.</p>
      ) : (
        <ul className="space-y-3">
          {history.map((h, i) => (
            <li key={i} className="p-3 bg-white shadow rounded-lg">
              <p className="font-semibold">Q: {h.query}</p>
              <p className="text-gray-700">A: {h.response}</p>
              <p className="text-sm text-gray-500">Source: {h.agent}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
