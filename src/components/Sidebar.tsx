import React from "react";
import { NavLink } from "react-router-dom";
import "../assets/styles/styles.css";

const imgProfile = "/img/profile.jpg";

//For the tests my partner must correct it so that it is dynamic, delete the comment once this is done
const leaseId = 1;

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <NavLink to="/profile" className={({ isActive }) => isActive ? "active" : ""}>
        <img src={imgProfile} alt="Profile" className="profile-pic" />
      </NavLink>

      <nav>
        <NavLink to="/wealth-management" className={({ isActive }) => isActive ? "active" : ""}>Wealth-management</NavLink>
        <NavLink to="/properties" className={({ isActive }) => isActive ? "active" : ""}>Properties</NavLink>
        <NavLink to="/leases" className={({ isActive }) => isActive ? "active" : ""}>Leases</NavLink>
        <NavLink to="/calendar" className={({ isActive }) => isActive ? "active" : ""}>Calendar</NavLink>
        <NavLink to={`/document-management/${leaseId}`} className={({ isActive }) => isActive ? "active" : ""}>Documents</NavLink>
        <NavLink to="/contacts" className={({ isActive }) => isActive ? "active" : ""}>Contacts</NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
