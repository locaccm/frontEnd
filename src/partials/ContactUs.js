import React, { useState } from "react";
import "../css/ContactUs.css";

// Define environment variables for the API and recipient
const API_URL = process.env.SEND_EMAIL; 
const RECIPIENT = process.env.DESTINATAIRE_MAIL;

const ContactUs = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // States to manage form submission and errors
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Function to update form fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Check that all fields are filled
    if (!formData.name || !formData.email || !formData.message) {
      setError("All fields are required!");
      setIsLoading(false);
      return;
    }

    try {
      // Send request to API
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: RECIPIENT,
          subject: `Message from ${formData.name}`,
          text: formData.message,
          html: `
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Message:</strong> ${formData.message}</p>
          `,
        }),
      });

      // Check server response
      if (!response.ok) throw new Error("Error sending message.");

      // Update state on success
      setIsSubmitted(true);
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="contact-container">
      <h2 className="contact-title">📩 Contact Us</h2>

      {/* Show success message if the form is submitted */}
      {isSubmitted ? (
        <div className="success-message">
          <p>Thank you for your message! 🎉</p>
        </div>
      ) : (
        // Contact form
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your name"
            />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Your email"
            />
          </div>

          <div className="form-group">
            <label>Message:</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Your message..."
            ></textarea>
          </div>

          {/* Display errors if needed */}
          {error && <p className="error-message">{error}</p>}

          {/* Submit button with loading state */}
          <button type="submit" className="contact-btn" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send 🚀"}
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactUs;
