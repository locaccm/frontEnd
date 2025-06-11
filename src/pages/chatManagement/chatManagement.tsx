import React, { useEffect, useState, useRef } from "react";
import {
  getUserById,
  getTenantsByOwner,
  getOwnerByTenant,
  getMessages,
  sendMessage,
  User,
  Message,
} from "../../core/api/chatApi.js";
import "../../styles/Chat.css";

function formatName(fname: string, lname: string) {
  const formattedFname =
    fname.charAt(0).toUpperCase() + fname.slice(1).toLowerCase();
  const formattedLname = lname.toUpperCase();
  return `${formattedFname} ${formattedLname}`;
}

const ChatManagement: React.FC = () => {
  const storedUserId = sessionStorage.getItem("userId");
  const userId = storedUserId ? parseInt(storedUserId, 10) : null;

  const [contacts, setContacts] = useState<User[]>([]);
  const [selectedContact, setSelectedContact] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
    if (userId === null) return;

    async function loadContacts(id: number) {
        try {
        const user = await getUserById(id);

        let linkedUsers: User[] = [];

        if (user.USEC_TYPE === "OWNER") {
            const tenants = await getTenantsByOwner(user.USEN_ID);
            linkedUsers = [user, ...tenants];
        } else if (user.USEC_TYPE === "TENANT") {
            const owner = await getOwnerByTenant(user.USEN_ID);
            linkedUsers = [user];
            if (owner) linkedUsers.push(owner);
        } else {
            linkedUsers = [user];
        }

        setContacts(linkedUsers);
        setSelectedContact(linkedUsers[0] || null);
        } catch (err) {
        console.error(err);
        }
    }

    loadContacts(userId);
    }, [userId]);

  useEffect(() => {
    if (!userId || !selectedContact) {
      setMessages([]);
      return;
    }

    getMessages(userId, selectedContact.USEN_ID)
      .then(setMessages)
      .catch(console.error);
  }, [selectedContact, userId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (): Promise<void> => {
    if (!newMessage.trim() || !selectedContact || !userId) return;

    try {
      await sendMessage(userId, selectedContact.USEN_ID, newMessage);
      const updatedMessages = await getMessages(userId, selectedContact.USEN_ID);
      setMessages(updatedMessages);
      setNewMessage("");
    } catch (err) {
      console.error(err);
    }
  };

  if (!userId) {
    return <div>Utilisateur non connecté, merci de vous identifier.</div>;
  }

  return (
    <div className="chat-app">
      <div className="contact-list">
        <h3 className="contact-list-title">Contacts</h3>
        <div className="contact-list-scroll">
          {contacts.map((contact) => (
            <div
              key={contact.USEN_ID}
              onClick={() => setSelectedContact(contact)}
              className={`contact ${
                selectedContact?.USEN_ID === contact.USEN_ID ? "selected" : ""
              }`}
            >
              {formatName(contact.USEC_FNAME, contact.USEC_LNAME)}
            </div>
          ))}
        </div>
      </div>

      <div className="chat-window">
        {selectedContact ? (
          <>
            <div className="messages">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`message ${
                    msg.MESN_SENDER === userId ? "sent" : "received"
                  }`}
                >
                  {msg.MESC_CONTENT}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="input-area">
              <input
                type="text"
                placeholder="Message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
              />
              <button onClick={handleSend}>Envoyer</button>
            </div>
          </>
        ) : (
          <div className="no-contact">Sélectionne un contact</div>
        )}
      </div>
    </div>
  );
};

export default ChatManagement;
