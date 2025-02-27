import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import "../css/ChatBubble.css";

const ChatBubble = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="chat-container">
      {isOpen && (
        <div className="chat-box">
          <p className="text-gray-700">Bienvenue dans le chat !</p>
        </div>
      )}
      <button onClick={() => setIsOpen(!isOpen)} className="chat-button">
        <MessageCircle size={24} />
      </button>
    </div>
  );
};

export default ChatBubble;