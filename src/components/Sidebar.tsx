import React from "react";
import "../assets/styles/styles.css";

interface SidebarProps {
    setActivePage: (page: string) => void;
}

const imgProfile = "/img/profile.jpg";

const Sidebar: React.FC<SidebarProps> = ({ setActivePage }) => {
    // preventDefault to avoid page reload on <a href="#">
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, page: string) => {
        e.preventDefault();
        setActivePage(page);
    };

    return (
        <div className="sidebar">
        <a href="#" onClick={(e) => handleClick(e, "profile")}>
            <img src={imgProfile} alt="Profile" className="profile-pic" />
        </a>

        <nav>
            <a href="#" onClick={(e) => handleClick(e, "properties")}>Properties</a>
            <a href="#" onClick={(e) => handleClick(e, "leases")}>Leases</a>
            <a href="#" onClick={(e) => handleClick(e, "calendar")}>Calendar</a>
            <a href="#" onClick={(e) => handleClick(e, "document")}>Documents</a>
            <a href="#" onClick={(e) => handleClick(e, "contact")}>Contacts</a>
        </nav>
        </div>
    );
};

export default Sidebar;
