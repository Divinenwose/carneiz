import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Authmodal.css";

const AuthModal = ({ isOpen, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "", name: "" });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    if (isSignUp && formData.password !== confirmPassword) {
      toast.error("Passwords do not match!", {
        style: { backgroundColor: "#dc3545", color: "#fff", fontWeight: "bold" },
      });
      setLoading(false);
      return;
    }
  
    const baseUrl = import.meta.env.VITE_API_URL;
    const apiUrl = isSignUp
      ? `${baseUrl}api/user/signup`
      : `${baseUrl}api/user/login`;
  
    const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
  
    try {
      const res = await axios.post(
        apiUrl,
        isSignUp ? formData : { ...formData, guestCart },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, 
        }
      );
  
      toast.success(isSignUp ? "Sign Up successful!" : "Login successful!", {
        style: { backgroundColor: "#2ecc71", color: "#fff", fontWeight: "bold" },
      });
  
      localStorage.setItem("token", res.data.token);
  
      if (!isSignUp) {
        localStorage.removeItem("guestCart");
        onClose();
      } else {
        setIsSignUp(false);
        setFormData({ email: "", password: "", name: "" });
        setConfirmPassword("");
      }
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
    setConfirmPassword("");
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
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            placeholder="Password"
            required
            onChange={handleChange}
          />
          {isSignUp && (
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              placeholder="Confirm Password"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}
          <label className="show-password">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            Show Password
          </label>
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
