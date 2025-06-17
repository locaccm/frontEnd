import React from "react";
import { NavLink } from "react-router-dom";
import "../assets/styles/styles.css";


const imgProfile = sessionStorage.getItem("userPhotoUrl") ?? "https://www.w3schools.com/howto/img_avatar.png";

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <NavLink to="/profile" className={({ isActive }) => isActive ? "active" : ""}>
        <img src={`${import.meta.env.VITE_BUCKET_UPLOAD_URL}/files/${imgProfile}`} alt="Profile" className="profile-pic" />
      </NavLink>

      <nav>
        <NavLink to="/wealth-management" className={({ isActive }) => isActive ? "active" : ""}>Logements</NavLink>
        <NavLink to="/leases" className={({ isActive }) => isActive ? "active" : ""}>Baux</NavLink>
        <NavLink to="/calendar" className={({ isActive }) => isActive ? "active" : ""}>Calendrier</NavLink>
        <NavLink to="/invite-tenant" className={({ isActive }) => isActive ? "active" : ""}>Inviter un locataire</NavLink>
        <NavLink to="/contacts" className={({ isActive }) => isActive ? "active" : ""}>Chats</NavLink>
      </nav>

      <button className="logout-button">
        <NavLink to="/logout" className="logout-link">Déconnexion</NavLink>
      </button>
    </div>
  );
};

export default Sidebar;
