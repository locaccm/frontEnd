import React, { useState } from "react";
<<<<<<< HEAD
import "../css/ContactUs.css";
=======
import "../css/ContactUs.css"; // Import du fichier CSS
>>>>>>> afac983 (Add 'Contact Us' frontend and manage sidebar links)

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
<<<<<<< HEAD
  const [error, setError] = useState(null);
=======
>>>>>>> afac983 (Add 'Contact Us' frontend and manage sidebar links)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

<<<<<<< HEAD
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: "destinataire@example.com", // Remplace avec ton email si nécessaire
          subject: `Message de ${formData.name}`,
          text: formData.message,
          html: `<p><strong>Nom:</strong> ${formData.name}</p>
                 <p><strong>Email:</strong> ${formData.email}</p>
                 <p><strong>Message:</strong> ${formData.message}</p>`,
        }),
      });

      if (!response.ok) throw new Error("Erreur lors de l'envoi du message.");

      setIsSubmitted(true);
    } catch (error) {
      setError("Une erreur est survenue. Veuillez réessayer.");
    }
=======
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
>>>>>>> afac983 (Add 'Contact Us' frontend and manage sidebar links)
  };

  return (
    <div className="contact-container">
      <h2 className="contact-title">📩 Contactez-nous</h2>

      {isSubmitted ? (
        <div className="success-message">
          <p>Merci pour votre message ! 🎉</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="contact-form">
<<<<<<< HEAD
=======
          {/* Nom */}
>>>>>>> afac983 (Add 'Contact Us' frontend and manage sidebar links)
          <div className="form-group">
            <label>Nom :</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Votre nom"
            />
          </div>

<<<<<<< HEAD
=======
          {/* Email */}
>>>>>>> afac983 (Add 'Contact Us' frontend and manage sidebar links)
          <div className="form-group">
            <label>Email :</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Votre email"
            />
          </div>

<<<<<<< HEAD
=======
          {/* Message */}
>>>>>>> afac983 (Add 'Contact Us' frontend and manage sidebar links)
          <div className="form-group">
            <label>Message :</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Votre message..."
            ></textarea>
          </div>

<<<<<<< HEAD
          {error && <p className="error-message">{error}</p>}

=======
          {/* Bouton Soumettre */}
>>>>>>> afac983 (Add 'Contact Us' frontend and manage sidebar links)
          <button type="submit" className="contact-btn">
            Envoyer 🚀
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactUs;
