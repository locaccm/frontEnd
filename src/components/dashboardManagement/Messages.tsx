// src/components/dashboardManagement/Messages.tsx
import { useEffect, useState } from "react";
import api from "../../core/apiExample.js";
import { useAuth } from "../../core/AuthContext.js";

type Message = {
  id: number;
  from: string;
  to: string;
  content: string;
  date: string;
};

const Messages = ({ userId }: { userId: number }) => {
  const { hasPermission } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (hasPermission("getMessage")) {
      api.get(`/messages?from=${userId}`)
        .then(res => setMessages(res.data))
        .catch(() => setError("Impossible de charger les messages"));
    }
  }, [userId, hasPermission]);

  return (
    <div>
      <h2 className="font-semibold mb-2">Mes messages</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="divide-y divide-gray-200">
        {messages.map(msg => (
          <li key={msg.id} className="py-2">
            <b>De :</b> {msg.from} <b>À :</b> {msg.to}<br />
            <span className="text-sm">{msg.content}</span><br />
            <span className="text-xs text-gray-500">{new Date(msg.date).toLocaleString()}</span>
          </li>
        ))}
        {messages.length === 0 && <li className="py-2 text-gray-400">Aucun message</li>}
      </ul>
    </div>
  );
};
export default Messages;
