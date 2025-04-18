import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import "../styles/ChatBubble.css";

const ChatBubble: React.FC = () => {
    // useState to manage the visibility of the chat box
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div className="chat-container">
            {/* Only display the chat box if isOpen is true */}
            {isOpen && (
                <div className="chat-box">
                    <p className="text-gray-700">Welcome to the chat!</p>
                </div>
            )}
            {/* Button to toggle the chat box visibility */}
            <button onClick={() => setIsOpen(!isOpen)} className="chat-button">
                <MessageCircle size={24} />
            </button>
        </div>
    );
};

export default ChatBubble;
