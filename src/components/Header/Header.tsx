import React from 'react';
import './Header.css';
import logo from '../../assets/images/ddloca.png';
import { Link } from 'react-router-dom'; 


const Header: React.FC = () => (
  <header className="header">
    <div className="container">
    <img src={logo} alt="Logo" className="logo" />
    <nav>
        <a href="#contact">Contact</a>
        <Link to="/login"><a href="#login">Connectez-vous</a></Link>
        
      </nav>
    </div>
  </header>
);

export default Header;
