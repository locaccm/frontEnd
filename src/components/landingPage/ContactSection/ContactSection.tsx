import React, { useState } from 'react';
import '../../../styles/landingPage/ContactSection.css';
import Logo from '../../../assets/images/landingPage/ddloca.png';
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mrbkkeqz"; // À adapter si besoin

const ContactSection: React.FC = () => {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);
    const formData = new FormData(e.currentTarget);

    // Pour Formspree, on doit envoyer du JSON (option recommandé)
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value as string;
    });

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSent(true);
        e.currentTarget.reset(); 
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    }
  };

  return (
    <section className="contact-section">
      <div className="contact-container">
        <div className="contact-info">
          <img src={Logo} className="contact-logo" alt="Logo" />
          <h3 id="padding_text">Contactez-nous</h3>
          <p>
            Que vous ayez des questions sur notre service ou que vous souhaitiez plus d'informations, notre équipe est là pour vous aider. N'hésitez pas à nous contacter !
          </p>
        </div>
        {sent ? (
          <div className="form-success" style={{ color: "green", marginTop: 32, fontWeight: 500, fontSize: 20, textAlign: "center" }}>
            Merci, votre message a bien été envoyé !
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label htmlFor="prenom_input">Prénom</label>
              <input
                id="prenom_input"
                name="prenom"
                type="text"
                placeholder="Votre prénom"
                required
              />
              <label htmlFor="nom_input">Nom</label>
              <input
                id="nom_input"
                name="nom"
                type="text"
                placeholder="Votre nom"
                required
              />
            </div>
            <div className="form-row">
              <label htmlFor="email_input">Email</label>
              <input
                id="email_input"
                name="email"
                type="email"
                placeholder="Votre email"
                required
              />
              <label htmlFor="telephone_input">Téléphone</label>
              <input
                id="telephone_input"
                name="telephone"
                type="tel"
                placeholder="Votre téléphone"
                required
              />
            </div>
            <label htmlFor="message_input">Message</label>
            <textarea
              id="message_input"
              name="message"
              placeholder="Votre message"
              required
            ></textarea>
            <button type="submit" className="submit-btn">
              Soumettre
            </button>
            {error && (
              <div style={{ color: "red", marginTop: 16, fontWeight: 500 }}>
                Une erreur est survenue, veuillez réessayer.
              </div>
            )}
          </form>
        )}
      </div>
    </section>
  );
};

export default ContactSection;