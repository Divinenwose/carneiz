import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home";
import Product from "./Pages/Product";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Cart from "./Pages/Cart";
import Order from "./Pages/Order";
import PromoBanner from "./Components/Promo Banner/PromoBanner";
import MyOrders from "./Pages/myOrders"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const token = localStorage.getItem("token");
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (token) {
      fetchCart();
    } else {
      loadGuestCart();
    }
  }, [token]);

  const fetchCart = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/cart/get`, 
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      const formattedCart = response.data.cart.map((item) => ({
        product: {
          _id: item.product._id,
          name: item.product.name,
          price: item.product.price,
          image: item.product.image
            ? `${apiUrl}/images/${item.product.image}`
            : "placeholder.jpg",
        },
        quantity: item.quantity,
      }));
  
      setCartItems(formattedCart);
  
  
      if (localStorage.getItem("guestCart")) {
        localStorage.removeItem("guestCart");
      }
    } catch (error) {
      console.error("Error fetching cart:", error.response?.data || error.message);
    }
  };
  

  const saveGuestCart = (cart) => {
    localStorage.setItem("guestCart", JSON.stringify(cart));
  };

  const loadGuestCart = () => {
    let guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];

  
    guestCart = guestCart.map((item) => ({
      ...item,
      product: {
        ...item.product,
        image: item.product.image?.startsWith("http")
          ? item.product.image
          : `${apiUrl}/images/${item.product.image || "placeholder.jpg"}`,
      },
    }));

    setCartItems(guestCart); 
  };

  const addToCart = async (product) => {
    if (token) {
      try {
        const response = await axios.post(
          `${apiUrl}/api/cart/add`,
          { productId: product._id, quantity: 1 },
          { headers: { Authorization: token ? `Bearer ${token}` : "" } }
        );
  
        if (response.data.success) {
          fetchCart(); 
          toast.success(`${product.name} added to cart!`);
        } else {
          toast.error("Failed to add item to cart.");
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
        toast.error("An error occurred while adding to cart.");
      }
    } else {
      // Guest cart logic
      setCartItems((prevCart) => {
        const existingItem = prevCart.find((item) => item.product._id === product._id);
        let updatedCart;
  
        if (existingItem) {
          updatedCart = prevCart.map((item) =>
            item.product._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          updatedCart = [...prevCart, { 
            product: {
              ...product, 
              image: product.image?.startsWith("http") ? product.image : `${apiUrl}/images/${product.image || "placeholder.jpg"}`
            }, 
            quantity: 1 
          }];
        }
  
        saveGuestCart(updatedCart);
        return updatedCart;
      });
  
      toast.success(`${product.name} added to cart!`);
    }
  };
    

  const updateQuantity = (productId, action) => {
    setCartItems((prevCart) => {
      const updatedCart = prevCart.map((item) => {
        if (item.product._id === productId) {
          return {
            ...item,
            quantity: action === "increase" ? item.quantity + 1 : Math.max(1, item.quantity - 1),
          };
        }
        return item;
      });

      if (!token) saveGuestCart(updatedCart);
      return updatedCart;
    });
  };

  const removeFromCart = async (productId) => {
    if (token) {
      try {
        const response = await axios.post(
          "http://localhost:4000/api/cart/remove",
          { productId },
          { headers: { Authorization: token ? `Bearer ${token}` : "" } }
        );
  
        if (response.data.success) {
          fetchCart(); 
          toast.info("Item removed from cart.");
        } else {
          toast.error("Failed to remove item from cart.");
        }
      } catch (error) {
        console.error("Error removing from cart:", error);
        toast.error("An error occurred while removing item.");
      }
    } else {
      // Guest cart logic
      setCartItems((prevCart) => {
        const updatedCart = prevCart.filter((item) => item.product._id !== productId);
        saveGuestCart(updatedCart);
        return updatedCart;
      });
  
      toast.info("Item removed from cart.");
    }
  };
  
  
  return (
    <div className="App">
      <ToastContainer position="top-right" autoClose={3000} />
      <PromoBanner />
      <Navbar cartItems={cartItems} setCartItems={setCartItems} />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home  addToCart={addToCart}  cartItems={cartItems}/>} />
        <Route path="/product" element={<Product addToCart={addToCart} cartItems={cartItems} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />} />
        <Route path="/order" element={<Order />} />
        <Route path="/myOrders" element={<MyOrders />} />
      </Routes>
    </div>
  );
};

export default App;
