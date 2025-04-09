import React, { useEffect, useState } from "react";
import axios from "axios";
import { assets } from "../../assets/assets";
import "./Orders.css";

const Orders = () => {
  const url = import.meta.env.VITE_API_URL;
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${url}/api/order/list`);
        setOrders(res.data.data); 
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, []);

  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value;
    try {
      await axios.post(`${url}/api/order/status`, {
        orderId,
        status: newStatus,
      });
  
    
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.error("Error updating order status:", err);
    }
  };
  

  return (
    <div className="admin-orders-page">
      {orders.length === 0 ? (
        <p>No orders available</p>
      ) : (
        orders.map((order) => (
          <div className="admin-order-card" key={order._id}>
            <div className="order-top">
              <img src={assets.parcel_icon} alt="parcel" />
              <div className="order-details">
                <p>
                  {order.items
                    .map((item) => `${item.name} x ${item.quantity}`)
                    .join(", ")}
                </p>
                <p>
                  <strong>
                    {order.deliveryDetails?.firstName}{" "}
                    {order.deliveryDetails?.lastName || ""}
                  </strong>
                </p>
                <p>
                  {order.deliveryDetails?.street || "No Address"} <br />
                  {order.deliveryDetails?.city}, {order.deliveryDetails?.state} <br />
                  {order.deliveryDetails?.country} <br />
                  {order.deliveryDetails?.email || "No Email"} <br />
                  {order.deliveryDetails?.phone || "No Phone"}
                </p>
              </div>
              <div className="order-meta">
                <p>Items: {order.items.length}</p>
                <p><strong>₦{order.totalAmount.toLocaleString()}</strong></p>
                <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
                  <option value="Processing">Processing</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
