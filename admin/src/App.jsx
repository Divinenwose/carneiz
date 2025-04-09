import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Routes, Route, useNavigate } from "react-router-dom";
import Add from './Pages/Add/Add.jsx';
import Orders from "./Pages/Orders/Orders.jsx";
import List from "./Pages/List/List.jsx";
import Auth from "./Pages/Auth/Auth.jsx";
import HomePage from "./Pages/Home/Home.jsx";
import { ToastContainer } from 'react-toastify';

const App = () => {
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem("adminToken")); 

  
  if (!isLoggedIn) {
    navigate("/auth", { replace: true });
  }

  return (
    <div>
      <ToastContainer />
      {isLoggedIn && <Navbar />} 
      <hr />
      <div className="app-content">
        {isLoggedIn && <Sidebar />} 
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<Add />} />
          <Route path="/list" element={<List />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/auth" element={<Auth />} /> 
        </Routes>
      </div>
    </div>
  );
};

export default App;
