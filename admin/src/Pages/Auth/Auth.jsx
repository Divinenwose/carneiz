import React, { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Auth.css";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const recaptchaRef = useRef(null);
  const navigate = useNavigate();

  const baseUrl = import.meta.env.VITE_API_URL;
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY; 

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const recaptchaToken = grecaptcha.getResponse(); 

    if (!recaptchaToken) {
      toast.error("Please complete the reCAPTCHA.");
      return;
    }

    const endpoint = isSignUp ? "/api/admin/signup" : "/api/admin/login";
    const fullUrl = `${baseUrl}${endpoint}`;

    const payload = isSignUp
      ? { fullName: formData.name, email: formData.email, password: formData.password, recaptchaToken }
      : { email: formData.email, password: formData.password, recaptchaToken };

    try {
      const { data } = await axios.post(fullUrl, payload);
      toast.success(data.message || "Authenticated successfully!");
      localStorage.setItem("adminToken", data.token);
      setTimeout(() => navigate("/home"), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isSignUp ? "Admin Sign up" : "Admin Login"}</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          {isSignUp && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <ReCAPTCHA
            sitekey={siteKey}
            onChange={(value) => setRecaptchaToken(value)}
            size="normal"
          />
          <button type="submit">{isSignUp ? "Sign Up" : "Login"}</button>
        </form>
        <p className="auth-toggle-text">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
          <button onClick={toggleForm} className="auth-toggle-btn">
            {isSignUp ? "Login" : "Sign up"}
          </button>
        </p>
      </div>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Auth;
