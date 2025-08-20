import React, { useState, useEffect } from "react";
import "./PromoBanner.css";

const PromoBanner = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    isOpen && (
      <div className="promo-modal">
        <div className="promo-content">
          <button className="close-btn" onClick={() => setIsOpen(false)}>
            &times;
          </button>
          <h2>🌍 Carneiz is Going Global!</h2>
          <p>
            Starting <strong>January 2026</strong>, <br />
            <strong>Carneiz will export our premium dried meats to the UK</strong>.  
          </p>
          <p>
            🥩✨ Meat lovers abroad, get ready to enjoy the authentic taste of 
            home — delivered right to your doorstep.
          </p>
          <p>
            Because <strong>Carneiz isn’t just food… it’s a flavor journey!</strong>
          </p>
        </div>
      </div>
    )
  );
};

export default PromoBanner;
