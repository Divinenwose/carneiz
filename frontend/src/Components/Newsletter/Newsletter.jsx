import React from 'react';
import './Newsletter.css';

const Newsletter = () => (
    <section className="newsletter">
      <h2>Subscribe to Our Newsletter</h2>
      <p>Stay updated with the latest products and special offers.</p>
      <form>
        <input type="email" placeholder="Enter your email" />
        <button type="submit">Subscribe</button>
      </form>
    </section>
  );
  
  export default Newsletter;
  