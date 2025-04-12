import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";
import Logo from '../../assets/logo.png';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo-address">
          <img src={Logo} alt="Logo" className="footer-logo" />
          <p>17 MCC Road Ikenegbu, Owerri, Imo State</p>
          <p>Phone: +2347075723880</p>
          <p>Email: info@carneiz.com</p>
        </div>
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/" onClick={scrollToTop}>Home</Link></li>
            <li><Link to="/about" onClick={scrollToTop}>About Us</Link></li>
            <li><Link to="/product" onClick={scrollToTop}>Shop Now</Link></li>
            <li><Link to="/contact" onClick={scrollToTop}>Contact</Link></li>
          </ul>
        </div>
        <div className="footer-socials">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://www.facebook.com/profile.php?id=61572984234559&locale=en_GB" target="_blank" rel="noopener noreferrer">
              <img src="./images/facebook-icon.png" alt="Facebook" className="social-icon" />
            </a>
            <a href="https://www.instagram.com/carneiz_meat_spices/" target="_blank" rel="noopener noreferrer">
              <img src="./images/instagram-icon.png" alt="Instagram" className="social-icon" />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer">
              <img src="./images/x-icon.png" alt="X (Twitter)" className="social-icon" />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Carneiz. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
