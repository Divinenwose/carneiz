import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import Footer from "../Components/footer/footer";
import "./Order.css";
import { jwtDecode } from "jwt-decode";
import Logo from "../assets/logo2.jpg";

const imoCities = [
  "Owerri", "Orlu", "Okigwe", "Mbaise", "Oguta", "Mbano", "Nkwerre", "Isu", "Ideato North", "Ideato South",
  "Ezinihitte", "Ngor Okpala", "Obowo", "Ihitte Uboma", "Nwangele", "Ohaji/Egbema", "Oru East", "Oru West",
  "Isiala Mbano", "Onuimo", "Aboh Mbaise", "Ehime Mbano"
];

const Order = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { subtotal = 0, deliveryFee = 2500, cartItems = [], discountAmount = 0, promoApplied = false } = location.state || {};

  const totalAmount = useMemo(() => {
   return subtotal + deliveryFee - discountAmount;
  }, [subtotal, deliveryFee, discountAmount]);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "Imo",
    country: "Nigeria",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email || !formData.email.includes("@")) newErrors.email = "Valid email is required";
    if (!formData.street) newErrors.street = "Street address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!/^\d{11}$/.test(formData.phone)) newErrors.phone = "Valid Nigerian phone number (11 digits) required";
    return newErrors;
  };

  const paymentConfig = useMemo(() => ({
    public_key: import.meta.env.VITE_FLW_PUBLIC_KEY,
    tx_ref: `TX-${Date.now()}`,
    amount: totalAmount,
    currency: "NGN",
    payment_options: "card, mobilemoney, ussd",
    customer: {
      email: formData.email,
      phone_number: formData.phone,
      name: `${formData.firstName} ${formData.lastName}`,
    },
    customizations: {
      title: "Carneiz Payment",
      description: "Payment for Meat and Spices",
      logo: Logo,
    },
  }), [formData, totalAmount]);

  const handleFlutterPayment = useFlutterwave(paymentConfig);

  const handleProceedToPayment = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please kindly log in.");
      return;
    }

    const decodedToken = jwtDecode(token);
    const userId = decodedToken ? decodedToken.id : null;

    if (!userId) {
      alert("Invalid user token.");
      return;
    }

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    if (totalAmount <= 0) {
      alert("Total amount must be greater than zero.");
      return;
    }

    handleFlutterPayment({
      callback: async (response) => {
        if (response.status === "successful") {
          console.log("Payment successful:", response);

          const orderData = {
            user: userId,
            items: cartItems.map((item) => ({
              product: item.product._id,
              name: item.product.name,
              quantity: item.quantity,
              price: item.product.price,
            })),
            totalAmount,
            transactionId: response.transaction_id,
            deliveryDetails: { 
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              street: formData.street,
              city: formData.city,
              state: formData.state,
              country: formData.country,
              phone: formData.phone,
            }
          };

          try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}api/order/place`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(orderData),
            });

            if (res.ok) {
              navigate("/myOrders");
            } else {
              const err = await res.json();
              console.error("Order saving failed:", err);
              alert("Failed to save order.");
            }
          } catch (error) {
            console.error("Error saving order:", error);
            alert("Failed to save order.");
          }
        } else {
          alert("Payment failed. Try again.");
        }

        closePaymentModal();
      },
      onClose: () => console.log("Payment modal closed"),
    });
  };

  return (
    <div className="order-container">
      <h2 className="order-title">Delivery Information</h2>
      <form onSubmit={handleProceedToPayment} className="order-content">
        <div className="order-form">
          <div className="form-row">
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && <span className="error">{errors.firstName}</span>}

            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && <span className="error">{errors.lastName}</span>}
          </div>

          <div className="form-row">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}

            <input
              type="text"
              name="street"
              placeholder="Street"
              value={formData.street}
              onChange={handleChange}
            />
            {errors.street && <span className="error">{errors.street}</span>}

            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </div>

          <div className="form-row">
            <select name="city" value={formData.city} onChange={handleChange}>
              <option value="">Select City</option>
              {imoCities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            {errors.city && <span className="error">{errors.city}</span>}
          </div>

          <div className="form-row">
            <input type="text" name="state" value="Imo" disabled />
          </div>

          <div className="form-row">
            <input type="text" name="country" value="Nigeria" disabled />
          </div>
        </div>

        <div className="cart-summary">
          <h3>Cart Totals</h3>
          <div className="cart-row">
            <span>Subtotal</span>
            <span className="amount">₦{subtotal.toLocaleString()}</span>
          </div>
          <div className="cart-row">
            <span>Delivery Fee</span>
            <span className="amount">₦{deliveryFee.toLocaleString()}</span>
          </div>
          {promoApplied && (
            <div className="cart-row">
              <span>Discount</span>
              <span className="amount">- ₦{discountAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
          )}
          <div className="cart-row total">
            <span>Total</span>
            <span className="amount">₦{totalAmount.toLocaleString()}</span>
          </div>
          <button type="submit" className="checkout-button">
            Proceed to Payment
          </button>
        </div>
      </form>

      <div className="order-footer">
        <Footer />
      </div>
    </div>
  );
};

export default Order;
