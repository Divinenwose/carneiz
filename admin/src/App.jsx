import React, { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Add from './Pages/Add/Add.jsx';
import Orders from "./Pages/Orders/Orders.jsx";
import List from "./Pages/List/List.jsx";
import Auth from "./Pages/Auth/Auth.jsx";
import HomePage from "./Pages/Home/Home.jsx";
import VerifyOtp from "./Pages/VerifyOTP/VerifyOtp.jsx";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = Boolean(localStorage.getItem("adminToken"));

  
  const isAuthPage = location.pathname === "/auth" || location.pathname === "/verify-otp";

  useEffect(() => {
    if (!isLoggedIn && !isAuthPage) {
      navigate("/auth", { replace: true });
    }
  }, [isLoggedIn, navigate, location.pathname]);

  return (
    <div>
      {isLoggedIn && !isAuthPage && <Navbar />}
      <hr />
      <div className="app-content">
        {isLoggedIn && !isAuthPage && <Sidebar />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<Add />} />
          <Route path="/list" element={<List />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
