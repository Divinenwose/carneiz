import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import cart_icon from '../../assets/shopping-cart (1).png';
import menu_icon from '../../assets/menu.png'; 
import user_icon from '../../assets/login.png'; 
import order_icon from '../../assets/order.png'; 
import logout_icon from '../../assets/logout.png'; 
import { Link, useLocation } from 'react-router-dom';
import whatsapp_icon from '../../assets/whatsapp.png';
import location_icon from '../../assets/location.png';
import envelope_icon from '../../assets/envelope.png';
import AuthModal from '../Authmodal/Authmodal';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = ({ cartItems, setCartItems }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const location = useLocation();
  const isActive = (path) => (location.pathname === path ? <hr /> : null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); 
  }, [isAuthOpen]); 

  useEffect(() => {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(totalItems);
  }, [cartItems]);

  useEffect(() => {
    setCartCount(cartItems.length > 0 ? cartItems.reduce((sum, item) => sum + item.quantity, 0) : 0);
  }, [cartItems]);

  const handleLogout = async () => {
    try {
        await axios.post("http://localhost:4000/api/user/logout");
        console.log("Logout successful");

       
        const currentCart = cartItems.length > 0 ? cartItems : JSON.parse(localStorage.getItem("guestCart")) || [];

        
        localStorage.removeItem("token");

        
        localStorage.setItem("guestCart", JSON.stringify(currentCart));

        
        setIsLoggedIn(false);
        setCartItems([...currentCart]); 
        toast.success("Logged out successfully!");

        console.log("Cart after logout:", currentCart);
    } catch (error) {
        console.error("Error during logout:", error.response?.data?.message || error.message);
        toast.error("Logout failed. Try again.");
    }
};


  return (
    <div className="navbar-container">
      <div className="navbar-contact">
        <div className="contact-item">
          <span><img src={location_icon} alt='' /></span> 
          <a 
            href="https://www.google.com/maps/search/?api=1&query=17+MCC+Road+Ikenegbu+Owerri+Imo+State" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="contact-link"
          >
            17 MCC Road Ikenegbu, Owerri, Imo State
          </a>
        </div>
        <div className="contact-item">
          <span><img src={envelope_icon} className='envelope' alt='' /></span> 
          <a href="mailto:info@carneiz.com" target="_blank" rel="noopener noreferrer"  className="contact-link">info@carneiz.com</a>
        </div>
        <div className="contact-item">
          <span><img src={whatsapp_icon} className='envelope' alt='' /></span> 
          <a href="https://wa.me/2347075723880" target="_blank"  rel="noopener noreferrer"  className="contact-link">+2347075723880</a>
        </div>
      </div>

      <div className="navbar">
        <div className="nav-logo">
          <a href="/Home">
            <img src={logo} alt="Carneiz Logo" className="nav-logo-img" />
          </a>
        </div>

        <ul className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
          <li><Link to="/Home" onClick={() => setIsMenuOpen(false)}>Home</Link>{isActive('/Home')}</li>
          <li><Link to="/About" onClick={() => setIsMenuOpen(false)}>About Us</Link>{isActive('/About')}</li>
          <li><Link to="/Product" onClick={() => setIsMenuOpen(false)}>Shop Now</Link>{isActive('/Product')}</li>
          <li><Link to="/Contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>{isActive('/Contact')}</li>
          {!isLoggedIn && (
            <li>
              <button 
                className="mobile-signup-btn" 
                onClick={() => {
                  setIsAuthOpen(true);
                  setIsMenuOpen(false);
                }}
              >
                Sign in
              </button>
            </li>
          )}
        </ul>

        <div className="nav-cart-icon">
          <div className="cart-container">
            <Link to="/Cart">
              <img src={cart_icon} alt="Cart" className="cart-icon" />
              <div className="nav-cart-count">{cartCount}</div> 
            </Link>
          </div>
          {isLoggedIn ? (
            <div className="user-dropdown">
              <img 
                src={user_icon} 
                alt="User Icon" 
                className="user-icon" 
                onClick={() => setDropdownOpen(!dropdownOpen)} 
              />
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <Link to="/myorders" className="dropdown-item">
                    <img src={order_icon} alt="Orders" className="dropdown-icon" /> Orders
                  </Link>
                  <hr className="dropdown-divider" />
                  <p className="dropdown-item logout-btn" onClick={handleLogout}>
                    <img src={logout_icon} alt="Logout" className="dropdown-icon" /> Log Out
                  </p>
                </div>
              )}
            </div>
          ) : (
            <button className='login-btn' onClick={() => setIsAuthOpen(true)}>Sign in</button>
          )}
          <img src={menu_icon} alt="Menu Icon" className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)} />
        </div>
      </div>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
};

export default Navbar;
