import React, { useEffect, useState } from "react";
import Sidebar from "./partials/Sidebar";
import "./css/Dashboard.css"; // Import du CSS
import Statistic from "./partials/Statistic";
import ContactUs from "./partials/ContactUs"; // Import du composant ContactUs
import ChatBubble from "./partials/ChatBubble";
import Calendar from "./partials/Calendar"; // Import du composant Calendar
import DocumentManager from "./partials/DocumentManager";
import Profile from "./partials/Profile";
import Properties from "./partials/Properties";
import Leases from "./partials/Leases";

function Dashboard() {
    const [message, setMessage] = useState("");
    const [activePage, setActivePage] = useState("statistic"); // État pour suivre la page active

    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL)
            .then((res) => res.text())
            .then((data) => setMessage(data))
            .catch((error) => console.error("Erreur de fetch :", error));
    }, []);

    return (
        <div className="app-container">
            {/* Sidebar avec gestion du clic */}
            <Sidebar setActivePage={setActivePage} />

            {/* Contenu principal */}
            <div className="content">
                <h1 className="text-2xl font-bold">Frontend React</h1>
                <p>Message du backend : {message || "Chargement..."}</p>

                {/* Affichage conditionnel de la page */}
                {activePage === "profile" ? <Profile /> :
                activePage === "properties" ? <Properties /> :
                activePage === "leases" ? <Leases /> :
                activePage === "statistic" ? <Statistic /> : 
                activePage === "contact" ? <ContactUs /> : 
                activePage === "calendar" ? <Calendar /> : 
                activePage === "document" ? <DocumentManager /> : null}
            </div>

            {/* Bulle de discussion */}
            <div>
                <ChatBubble />
            </div>
        </div>
    );
}

export default Dashboard;
