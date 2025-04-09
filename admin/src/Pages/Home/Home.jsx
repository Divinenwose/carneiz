// HomePage.jsx
import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Add from "../Add/Add";
import List from "../List/List";
import Orders from "../Orders/Orders";
import Sidebar from "../../components/Sidebar/Sidebar";

const HomePage = () => {
  return (
    <div>
        <Navbar />
        <Sidebar />
        <Add />
        <List />
        <Orders />
    </div>
  );
};

export default HomePage;
