import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Authmodal.css";

const AuthModal = ({ isOpen, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "", name: "" });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const apiUrl = isSignUp
      ? "http://localhost:4000/api/user/signup"
      : "http://localhost:4000/api/user/login";
  
    // Retrieve guest cart from localStorage
    const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
  
    try {
      // Send login/signup request along with guestCart (only for login)
      const res = await axios.post(apiUrl, isSignUp ? formData : { ...formData, guestCart });
  
      toast.success(isSignUp ? "Sign Up successful!" : "Login successful!", {
        style: { backgroundColor: "#2ecc71", color: "#fff", fontWeight: "bold" },
      });
  
      localStorage.setItem("token", res.data.token);
  
      // If login is successful, clear guest cart
      if (!isSignUp) {
        localStorage.removeItem("guestCart");
      }
  
      onClose(); // Close modal after successful authentication
    } catch (error) {
      console.error("🚨 Server Response Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Login/Sign Up failed. Try again!", {
        style: { backgroundColor: "#dc3545", color: "#fff", fontWeight: "bold" },
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setFormData({ email: "", password: "", name: isSignUp ? "" : formData.name });
  };

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2>{isSignUp ? "Sign Up" : "Login"}</h2>
        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Full Name"
              required
              onChange={handleChange}
            />
          )}
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email"
            required
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Password"
            required
            onChange={handleChange}
          />
          <button type="submit" disabled={loading || !formData.email || !formData.password}>
            {loading ? "Processing..." : isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>
        <p>
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <span onClick={toggleMode}>{isSignUp ? "Login" : "Sign Up"}</span>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
