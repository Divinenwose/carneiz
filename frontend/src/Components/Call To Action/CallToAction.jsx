import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './CallToAction.css';

const CallToAction = () => {
  const navigate = useNavigate(); 
  const handleClick = () => {
    navigate('/product'); 
  };

  return (
    <section className="call-to-action">
      <h2>Ready to Experience the Best Meats?</h2>
      <button onClick={handleClick}>Shop Now</button>
    </section>
  );
};

export default CallToAction;
