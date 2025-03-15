import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import "../css/ChatBubble.css";

const ChatBubble = () => {
  // State to manage the chat bubble's open or closed status
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="chat-container">
      {/* Display the chat box if isOpen is true */}
      {isOpen && (
        <div className="chat-box">
          <p className="text-gray-700">Welcome to the chat!</p>
        </div>
      )}
      {/* Button to open/close the chat bubble */}
      <button onClick={() => setIsOpen(!isOpen)} className="chat-button">
        <MessageCircle size={24} />
      </button>
    </div>
  );
};

export default ChatBubble;
