import React from 'react';
import '../../../styles/landingPage/Header.css';
import logo from '../../../assets/images/landingPage/ddloca.png';
import { Link } from 'react-router-dom'; 


const Header: React.FC = () => (
  <header className="header">
    <div className="containerLP">
    <img src={logo} alt="Logo" className="logo" />
    <nav>
        <a href="#contact">Contact</a>
        <Link to="/signin">Connectez-vous</Link>
        
      </nav>
    </div>
  </header>
);

export default Header;
