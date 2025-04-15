import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import parcel_icon from "../assets/parcel_icon.png";
import axios from "axios";
import "./myOrders.css";


const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const userToken = localStorage.getItem("token");

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}api/order/userorders`, 
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      setOrders(response.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  useEffect(() => {
    if (!userToken) {
      navigate("/cart"); 
    } else {
      fetchOrders(); 
    }
  }, [userToken, navigate]);

  
  const handleTrackClick = () => {
    fetchOrders(); 
  };


  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="orders-container">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-image">
                <img src={parcel_icon} alt="Parcel" />
              </div>
              <div className="order-info">
                <h3>
                  {order.items
                    .map((item) => `${item.name} x${item.quantity}`)
                    .join(", ")}
                </h3>
                <p>Items: {order.items.length}</p>
                <p>
                  Total: <strong>₦{order.totalAmount.toLocaleString()}</strong>
                </p>
                <span
                  className={`status ${order.status
                    ?.toLowerCase()
                    .replace(/\s/g, "-")}`}
                >
                  {order.status}
                </span>
              </div>
              <button
                className="track-btn"
                onClick={handleTrackClick}
              >
                Track Order
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
