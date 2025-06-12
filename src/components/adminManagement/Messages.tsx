import React, { useEffect, useState } from 'react';
import api from '../../infrastructre/services/adminApi.js';

// Interface describing a message object
interface Message {
  MESN_ID: number;
  MESC_CONTENT: string;
  MESD_DATE: string;
  MESB_NEW: boolean;
  receiver: {
    USEC_LNAME: string;
    USEC_FNAME: string;
  };
}

// Props: expects a userId to fetch messages for that user
const Messages: React.FC<{ userId: number }> = ({ userId }) => {
  // State: holds all messages for this user
  const [messages, setMessages] = useState<Message[]>([]);

  // Loads messages from the API for the given userId
  const load = async () => {
    const res = await api.get(`/messages?userId=${userId}`);
    setMessages(res.data);
  };

  // Loads messages when component mounts or userId changes
  useEffect(() => { load(); }, [userId]);

  // Mark a message as read and reloads the list
  const markRead = async (id: number) => {
    await api.put(`/messages/${id}/read`);
    load();
  };

  // Delete a message and reloads the list
  const handleDelete = async (id: number) => {
    await api.delete(`/messages/${id}`);
    load();
  };

  return (
    <div className="messages-container">
      {/* Title */}
      <h2 className="messages-title">Messages</h2>
      <div className="messages-list">
        <ul>
          {/* For each message, render its content, meta info, and actions */}
          {messages.map(msg => (
            <li key={msg.MESN_ID} className="message-item">
              <div className="message-content">
                {/* Message text */}
                <p className="content">{msg.MESC_CONTENT}</p>
                {/* Info about recipient and date, and if the message is read */}
                <small className="meta">
                  Envoyé à {msg.receiver.USEC_FNAME} {msg.receiver.USEC_LNAME} le {new Date(msg.MESD_DATE).toLocaleString()}
                  {!msg.MESB_NEW && <span> — Lu</span>}
                </small>
              </div>
              <div className="message-actions">
                {/* Show "mark as read" only if the message is new */}
                {msg.MESB_NEW && (
                  <button onClick={() => markRead(msg.MESN_ID)}>Marquer comme lu</button>
                )}
                {/* Always show delete button */}
                <button onClick={() => handleDelete(msg.MESN_ID)}>Supprimé</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Messages;
