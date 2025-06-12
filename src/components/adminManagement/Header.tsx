import React from 'react';
import logo from '../../assets/images/Logo_LacaCCM.png'; 

// Simple header component displaying a logo and admin controls
const Header: React.FC = () => {
  return (
    <div className="custom-header">
      {/* Left section: shows the logo */}
      <div className="left-section">
        <img src={logo} alt="Logo" className="logo-image" />
      </div>
      {/* Right section: admin label and logout button */}
      <div className="header-buttons">
        <span className="admin-label">Admin</span>
        <button>Déconnexion</button>
      </div>
    </div>
  );
};

export default Header;
