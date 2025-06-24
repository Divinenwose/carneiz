import React, { useState, useEffect } from "react";
import "./Contact.css";
import Footer from "../Components/footer/footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent("Message from " + formData.name);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:info@carneiz.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>We’d love to hear from you! Get in touch with us for any questions or feedback.</p>
      </div>
      <div className="contact-container">
        <div className="contact-form">
          <h2>Send Us a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                rows="5"
                placeholder="Write your message"
                required
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>

            <button type="submit" className="contact-submit-button">Send Message</button>
          </form>
        </div>

        <div className="contact-info">
          <h2>Contact Information</h2>
          <p>Feel free to reach us through the following channels:</p>
          <ul>
            <li><strong>Address:</strong> 17 MCC/Uratta Road Ikenegbu, Owerri, Imo State, Nigeria</li>
            <li><strong>Phone:</strong> +2347075723880</li>
            <li><strong>Email:</strong> info@carneiz.com</li>
          </ul>
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://www.facebook.com/profile.php?id=61572984234559&locale=en_GB" target="_blank" rel="noopener noreferrer">
              <img src="./images/facebook-icon.png" alt="Facebook" />
            </a>
            <a href="https://www.instagram.com/carneiz_meat_spices/" target="_blank" rel="noopener noreferrer">
              <img src="./images/instagram-icon.png" alt="Instagram" />
            </a>
            <a href="https://www.tiktok.com/@carneiz?_t=ZN-8xC7kHxtdVW&_r=1" target="_blank" rel="noopener noreferrer">
              <img src="./images/tik-tok.png" alt="X (Twitter)" className="social-icon" />
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
