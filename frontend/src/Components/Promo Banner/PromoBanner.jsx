import React, { useState, useEffect } from "react";
import "./PromoBanner.css";

const PromoBanner = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [animationKey, setAnimationKey] = useState(Date.now());

  const getOrSetTargetDate = () => {
    const storedDate = localStorage.getItem("promoTargetDate");

    if (storedDate) {
      return new Date(storedDate);
    } else {
      const now = new Date();
      const targetDate = new Date(now);
      targetDate.setMonth(now.getMonth() + 1); // 1 month ahead
      localStorage.setItem("promoTargetDate", targetDate.toISOString());
      return targetDate;
    }
  };

  const calculateTimeLeft = (targetDate) => {
    const now = new Date();
    return Math.max(0, Math.floor((targetDate - now) / 1000)); // in seconds
  };

  const [targetDate] = useState(getOrSetTargetDate);
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetDate));

  useEffect(() => {
    setAnimationKey(Date.now());
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        return newTime >= 0 ? newTime : 0;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${days}d ${hours}h ${minutes}m ${secs}s`;
  };

  return (
    isOpen &&
    timeLeft > 0 && (
      <div className="promo-modal">
        <div key={animationKey} className="promo-content">
          <button className="close-btn" onClick={() => setIsOpen(false)}>
            &times;
          </button>
          <h2>🎉 Exclusive Offer!</h2>
          <p>
            Buy any meat worth <strong>3kg</strong> or above and receive 
            <strong> 0.5L of cooking oil</strong> as an incentive. <br />
            Buy <strong>5kg</strong> or more and get <strong>₦1000 discount!</strong> in addition to <strong> 0.5L of cooking oil.</strong>
          </p>
          <p className="countdown">⏳ Offer ends in: {formatTime(timeLeft)}</p>
        </div>
      </div>
    )
  );
};

export default PromoBanner;
