import React, { useEffect, useState } from "react";
import Sidebar from "./partials/Sidebar";
import "./css/Dashboard.css"; 
import Statistic from "./partials/Statistic";
import ContactUs from "./partials/ContactUs"; 
import ChatBubble from "./partials/ChatBubble";
import Calendar from "./partials/Calendar"; 
import DocumentManager from "./partials/DocumentManager";
import Profile from "./partials/Profile";
import Properties from "./partials/Properties";
import Leases from "./partials/Leases";

function Dashboard() {
    // State to store the message fetched from the backend
    const [message, setMessage] = useState("");
    // State to manage the currently active page
    const [activePage, setActivePage] = useState("statistic");

    // Fetch data from the backend when the component mounts
    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL)
            .then((res) => res.text())
            .then((data) => setMessage(data))
            .catch((error) => console.error("Fetch error:", error));
    }, []);

    return (
        <div className="app-container">
            {/* Sidebar component to navigate between pages */}
            <Sidebar setActivePage={setActivePage} />

            <div className="content">
                <h1 className="text-2xl font-bold">Frontend React</h1>
                <p>Backend message: {message || "Loading..."}</p>

                {/* Render the active page based on state */}
                {activePage === "profile" ? <Profile /> :
                activePage === "properties" ? <Properties /> :
                activePage === "leases" ? <Leases /> :
                activePage === "statistic" ? <Statistic /> : 
                activePage === "contact" ? <ContactUs /> : 
                activePage === "calendar" ? <Calendar /> : 
                activePage === "document" ? <DocumentManager /> : null}
            </div>

            {/* Chat bubble component */}
            <div>
                <ChatBubble />
            </div>
        </div>
    );
}

export default Dashboard;
