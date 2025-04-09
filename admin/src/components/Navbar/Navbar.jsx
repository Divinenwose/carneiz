import React, { useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const baseUrl = import.meta.env.VITE_API_URL;
    const logoutUrl = `${baseUrl}/api/admin/logout`;

    try {
      const response = await axios.get(logoutUrl);

      if (response.status === 200) {
        localStorage.removeItem("adminToken");
        toast.success("Logged out successfully");
        setTimeout(() => {
          navigate("/auth", { replace: true });
          setIsLoggedOut(true);
        }, 1500); 
      }
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("An error occurred during logout. Please try again.");
    }
  };

  if (isLoggedOut) {
    return null;
  }

  return (
    <>
      <div className="navbar">
        <div className="logo-container">
          <img className="logo" src={assets.logo} alt="Logo" />
          <p>Admin Panel</p>
        </div>
        <div className="profile-container">
          <img className="profile" src={assets.profile_icon} alt="Profile" />
          <button className="logout-btn" onClick={handleLogout}>Log Out</button>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default Navbar;
