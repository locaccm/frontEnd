// src/components/dashboardManagement/Messages.tsx

import { useEffect, useState } from "react";
import api from "../../core/api/dashbordManagement/api.js";
import { useAuth } from "../../core/api/dashbordManagement/AuthContext.js";

// Define the Message type expected from the API
type Message = {
  id: number;
  from: string;
  to: string;
  content: string;
  date: string;
};

/**
 * Displays the list of messages for a user.
 * Fetches messages only if the user has the correct permission.
 *
 * @param userId - The ID of the user whose messages to load.
 */
const Messages = ({ userId }: { userId: number }) => {
  // Access user permissions from AuthContext
  const { hasPermission } = useAuth();
  // State for messages and potential error
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState("");

  /**
   * Effect: Fetch messages from the API whenever userId or permissions change.
   * Only fetch if the user has the "getMessage" permission.
   */
  useEffect(() => {
    if (hasPermission("getMessage")) {
      api
        .get(`/messages?from=${userId}`)
        .then((res) => setMessages(res.data))
        .catch(() => setError("Impossible de charger les messages"));
    }
  }, [userId, hasPermission]);

  // Render the UI: error, loading, or list of messages
  return (
    <div>
      <h2 className="font-semibold mb-2">Mes messages</h2>
      {/* Show error message if fetch fails */}
      {error && <p className="text-red-500">{error}</p>}

      <ul className="divide-y divide-gray-200">
        {/* Display each message, or a "no message" message if the list is empty */}
        {messages.map((msg) => (
          <li key={msg.id} className="py-2">
            <b>De :</b> {msg.from} <b>À :</b> {msg.to}
            <br />
            <span className="text-sm">{msg.content}</span>
            <br />
            <span className="text-xs text-gray-500">
              {new Date(msg.date).toLocaleString()}
            </span>
          </li>
        ))}
        {/* If no messages, show placeholder */}
        {messages.length === 0 && (
          <li className="py-2 text-gray-400">Aucun message</li>
        )}
      </ul>
    </div>
  );
};

export default Messages;
