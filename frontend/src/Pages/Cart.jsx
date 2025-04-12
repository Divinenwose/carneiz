import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/footer/footer";
import "./Cart.css";

const Cart = ({ cartItems, updateQuantity, removeFromCart }) => {
  const navigate = useNavigate();
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  

  const calculateSubtotal = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2);
  }, [cartItems]);

  const calculateTotalWeight = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const applyPromo = useCallback(() => {
    if (calculateTotalWeight() >= 5) {
      setDiscount(10);
      setPromoApplied(true);
    } else {
      setDiscount(0);
      setPromoApplied(false);
    }
  }, [calculateTotalWeight]);

  useEffect(() => {
    applyPromo();
  }, [cartItems]); 

  const calculateTotal = useCallback(() => {
    const subtotal = parseFloat(calculateSubtotal());
    const discountAmount = (subtotal * discount) / 100;
    const deliveryFee = 2;
    return (subtotal - discountAmount + deliveryFee).toFixed(2);
  }, [calculateSubtotal, discount]);

  const handleProceedToCheckout = () => {
    navigate("/order", {
      state: {
        cartItems,
        subtotal: parseFloat(calculateSubtotal()),
        deliveryFee: 2,
        discount,
        totalAmount: calculateTotal(),
        promoApplied,
      },
    });
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="empty">Your cart is empty!</p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Items</th>
                <th>Title</th>
                <th>Price</th>
                <th>Quantity (kg)</th>
                <th>Total</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.product?._id}>
                  <td>
                    <img src={item.product.image || "placeholder.jpg"} alt={item.product.name} className="cart-item-image" />
                  </td>
                  <td>{item.product?.name}</td>
                  <td>₦{item.product?.price?.toFixed(2)}</td>
                  <td>
                    <button className="decrease" onClick={() => updateQuantity(item.product?._id, "decrease")} disabled={item.quantity <= 1}>-</button>
                    <span className="item-quantity">{item.quantity}</span>
                    <button className="increase" onClick={() => updateQuantity(item.product?._id, "increase")}>+</button>
                  </td>
                  <td>${((item.product?.price || 0) * item.quantity).toFixed(2)}</td>
                  <td>
                    <button className="remove-button" onClick={() => removeFromCart(item.product?._id)}>x</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cart-summary-container">
            <div className="cart-summary">
              <h3>Cart Totals</h3>
              <div className="cart-row">
                <span>Subtotal</span>
                <span className="amount">₦{calculateSubtotal()}</span>
              </div>
              <div className="cart-row">
                <span>Delivery Fee</span>
                <span className="amount">₦2.00</span>
              </div>
              {calculateTotalWeight() >= 1 && (
                <div className="cart-row">
                  <span>Bonus</span>
                  <span className="amount">🎁 0.5L Cooking Oil</span>
                </div>
              )}
              {promoApplied && (
                <div className="cart-row">
                  <span>Discount</span>
                  <span className="amount">-10%</span>
                </div>
              )}
              <div className="cart-row total">
                <span>Total</span>
                <span className="amount">₦{calculateTotal()}</span>
              </div>
              <button className="checkout-button" onClick={handleProceedToCheckout}>Proceed to Checkout</button>
            </div>
          </div>
        </>
      )}
      <Footer />
    </div>
  );
};

export default Cart;
