import React from 'react';
import './ContactSection.css';
import Logo from '../../assets/images/ddloca.png';

const ContactSection: React.FC = () => (
    <section className="contact-section">
      <div className="contact-container">
        <div className="contact-info">
        <img src={Logo} className="contact-logo" alt="Logo" />
          <h3 id="padding_text">Contactez-nous</h3>
          <p>
            Que vous ayez des questions sur notre service ou que vous souhaitiez plus d'informations, notre équipe est là pour vous aider. N'hésitez pas à nous contacter !
          </p>
        </div>
        <form className="contact-form">
          <div className="form-row">
          <label  >Prénom</label>
            <input id="prenom_input" type="text" placeholder="Votre prénom" required />
            <label >Nom</label>
            <input id="nom_input"type="text" placeholder="Votre nom" required />
          </div>
          <div className="form-row">
          <label id="label" >Email</label>
            <input id="email_input" type="email" placeholder="Votre email" required />
            <label id="telephone_label" >Téléphone</label>
            <input id="telephone_input"type="tel" placeholder="Votre téléphone" required />
          </div>
          <label  >Message</label>
          <textarea placeholder="Votre message" required></textarea>
          <button type="submit" className="submit-btn">Soumettre</button>
        </form>
      </div>
    </section>
  );

export default ContactSection;
