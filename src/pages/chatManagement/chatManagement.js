import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState, useRef } from "react";
import { getUserById, getTenantsByOwner, getOwnerByTenant, getMessages, sendMessage, } from "../../core/api/chatApi.js";
import "../../styles/Chat.css";
function formatName(fname, lname) {
    const formattedFname = fname.charAt(0).toUpperCase() + fname.slice(1).toLowerCase();
    const formattedLname = lname.toUpperCase();
    return `${formattedFname} ${formattedLname}`;
}
const ChatManagement = () => {
    const storedUserId = sessionStorage.getItem("userId");
    const userId = storedUserId ? parseInt(storedUserId, 10) : null;
    const [contacts, setContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef(null);
    useEffect(() => {
        if (userId === null)
            return;
        async function loadContacts(id) {
            try {
                const user = await getUserById(id);
                let linkedUsers = [];
                if (user.USEC_TYPE === "OWNER") {
                    const tenants = await getTenantsByOwner(user.USEN_ID);
                    linkedUsers = [user, ...tenants];
                }
                else if (user.USEC_TYPE === "TENANT") {
                    const owner = await getOwnerByTenant(user.USEN_ID);
                    linkedUsers = [user];
                    if (owner)
                        linkedUsers.push(owner);
                }
                else {
                    linkedUsers = [user];
                }
                setContacts(linkedUsers);
                setSelectedContact(linkedUsers[0] || null);
            }
            catch (err) {
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
    const handleSend = async () => {
        if (!newMessage.trim() || !selectedContact || !userId)
            return;
        try {
            await sendMessage(userId, selectedContact.USEN_ID, newMessage);
            const updatedMessages = await getMessages(userId, selectedContact.USEN_ID);
            setMessages(updatedMessages);
            setNewMessage("");
        }
        catch (err) {
            console.error(err);
        }
    };
    if (!userId) {
        return _jsx("div", { children: "Utilisateur non connect\u00E9, merci de vous identifier." });
    }
    return (_jsxs("div", { className: "chat-app", children: [_jsxs("div", { className: "contact-list", children: [_jsx("h3", { className: "contact-list-title", children: "Contacts" }), _jsx("div", { className: "contact-list-scroll", children: contacts.map((contact) => (_jsx("div", { onClick: () => setSelectedContact(contact), className: `contact ${selectedContact?.USEN_ID === contact.USEN_ID ? "selected" : ""}`, children: formatName(contact.USEC_FNAME, contact.USEC_LNAME) }, contact.USEN_ID))) })] }), _jsx("div", { className: "chat-window", children: selectedContact ? (_jsxs(_Fragment, { children: [_jsxs("div", { className: "messages", children: [messages.map((msg, i) => (_jsx("div", { className: `message ${msg.MESN_SENDER === userId ? "sent" : "received"}`, children: msg.MESC_CONTENT }, i))), _jsx("div", { ref: messagesEndRef })] }), _jsxs("div", { className: "input-area", children: [_jsx("input", { type: "text", placeholder: "Message...", value: newMessage, onChange: (e) => setNewMessage(e.target.value), onKeyDown: (e) => {
                                        if (e.key === "Enter")
                                            handleSend();
                                    } }), _jsx("button", { onClick: handleSend, children: "Envoyer" })] })] })) : (_jsx("div", { className: "no-contact", children: "S\u00E9lectionne un contact" })) })] }));
};
export default ChatManagement;
