import React from 'react';
import logo from '../assets/Logo_LacaCCM.png'; 
const Header: React.FC = () => {
  return (
    <div className="custom-header">
      <div className="left-section">
        <img src={logo} alt="Logo" className="logo-image" />
      </div>
      <div className="header-buttons">
      <span className="admin-label">Admin</span>
        <button>Déconnexion</button>
      </div>
    </div>
  );
};

export default Header;
