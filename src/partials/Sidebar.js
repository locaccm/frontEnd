import React from "react";
import "../css/Sidebar.css"; 

// Profile image path
const imgProfile = "/img/profile.jpg";

const Sidebar = ({ setActivePage }) => {
  return (
    <div className="sidebar">
      {/* Profile picture link, clicking it sets active page to 'profile' */}
      <a href="#" onClick={() => setActivePage("profile")}>
        <img src={imgProfile} alt="Profile" className="profile-pic" />
      </a>

      {/* Navigation menu with links to different sections */}
      <nav>
        <a href="#" onClick={() => setActivePage("properties")}>Properties</a>
        <a href="#" onClick={() => setActivePage("leases")}>Leases</a>
        <a href="#" onClick={() => setActivePage("calendar")}>Calendar</a>
        <a href="#" onClick={() => setActivePage("document")}>Documents</a>
        <a href="#" onClick={() => setActivePage("contact")}>Contacts</a>
      </nav>
    </div>
  );
};

export default Sidebar;
