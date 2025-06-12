import React, { useEffect, useState } from 'react';
import api from '../services/api.js';

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

const Messages: React.FC<{ userId: number }> = ({ userId }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const load = async () => {
    const res = await api.get(`/messages?userId=${userId}`);
    setMessages(res.data);
  };

  useEffect(() => { load(); }, [userId]);

  const markRead = async (id: number) => {
    await api.put(`/messages/${id}/read`);
    load();
  };

  const handleDelete = async (id: number) => {
    await api.delete(`/messages/${id}`);
    load();
  };

  return (
    <div className="messages-container">
      <h2 className="messages-title">Messages</h2>
      <div className="messages-list">
        <ul>
          {messages.map(msg => (
            <li key={msg.MESN_ID} className="message-item">
              <div className="message-content">
                <p className="content">{msg.MESC_CONTENT}</p>
                <small className="meta">
                  Envoyé à {msg.receiver.USEC_FNAME} {msg.receiver.USEC_LNAME} le {new Date(msg.MESD_DATE).toLocaleString()}
                  {!msg.MESB_NEW && <span> — Lu</span>}
                </small>
              </div>
              <div className="message-actions">
                {msg.MESB_NEW && (
                  <button onClick={() => markRead(msg.MESN_ID)}>Marquer comme lu</button>
                )}
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
