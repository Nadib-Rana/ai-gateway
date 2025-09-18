import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-md flex flex-col">
      <div className="px-6 py-4 border-b">
        <h1 className="text-xl font-bold">🤖 AI Gateway</h1>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-3">
        <Link to="/" className="block px-3 py-2 rounded hover:bg-gray-200">
          Chat
        </Link>
        <Link to="/history" className="block px-3 py-2 rounded hover:bg-gray-200">
          History
        </Link>
        <Link to="/about" className="block px-3 py-2 rounded hover:bg-gray-200">
          About
        </Link>
        <Link to="/admin" className="block px-3 py-2 rounded hover:bg-gray-200">
          Admin
        </Link>
      </nav>
    </div>
  );
}
