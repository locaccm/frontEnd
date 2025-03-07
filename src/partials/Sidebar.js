import React from "react";
import "../css/Sidebar.css"; // Import du CSS

const Sidebar = ({ setActivePage }) => {
  return (
    <div className="sidebar">
      <a href="#" onClick={() => setActivePage("profile")}><img src="/img/profile.jpg" alt="Profil" className="profile-pic" /></a>
      <nav>
        <a href="#" onClick={() => setActivePage("properties")}>Patrimoines</a>
        <a href="#" onClick={() => setActivePage("leases")}>Bails</a>
        <a href="#" onClick={() => setActivePage("calendar")}>Calendrier</a>
        <a href="#" onClick={() => setActivePage("document")}>Documents</a>
        <a href="#" onClick={() => setActivePage("contact")}>Contacts</a>
      </nav>
    </div>
  );
};

export default Sidebar;
