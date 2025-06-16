import React, { useState } from 'react';
import '../../../styles/landingPage/ContactSection.css';
import Logo from '../../../assets/images/landingPage/ddloca.png';

// Endpoint for Formspree (change if needed)
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mrbkkeqz";

const ContactSection: React.FC = () => {
  // State to handle form submission and error status
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);

    // Collect form data
    const formData = new FormData(e.currentTarget);
    // Convert FormData to JSON object for Formspree
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
        setSent(true);a
        e.currentTarget.reset(); // Reset form after success
      } else {
        setError(true); // Show error if not OK
      }
    } catch {
      // Catch network or other errors
      setError(true);
    }
  };

  return (
    <section className="contact-section">
      <div className="contact-container">
        {/* Contact info and logo */}
        <div className="contact-info">
          <img src={Logo} className="contact-logo" alt="Logo" />
          <h3 id="padding_text">Contactez-nous</h3>
          <p>
            Que vous ayez des questions sur notre service ou que vous souhaitiez plus d'informations, notre équipe est là pour vous aider. N'hésitez pas à nous contacter !
          </p>
        </div>
        {sent ? (
          // Success message after form is sent
          <div
            className="form-success"
            style={{ color: "green", marginTop: 32, fontWeight: 500, fontSize: 20, textAlign: "center" }}
          >
            Merci, votre message a bien été envoyé !
          </div>
        ) : (
          // Contact form
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
            {/* Error message if submission fails */}
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
