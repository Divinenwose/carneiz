import React from 'react';
import './Testimonials.css';

const Testimonials = () => {
    const reviews = [
      {
        name: "Olaniyi Olakunle",
        review: "The best meat I've ever tasted! Perfectly fresh and delivered on time.",
        img: "./images/bobby.jpg",
        rating: 5
      },
      {
        name: "Divine Nwose",
        review: "The spices are amazing! They took my cooking to the next level.",
        img: "./images/Divine.jpg",
        rating: 4
      },
      {
        name: "Onuigbo Victoria",
        review: "Fantastic quality and flavor! Highly recommended.",
        img: "./images/vicky.jpg",
        rating: 5
      },
      {
        name: "Rachael Adams",
        review: "Great service and fresh ingredients. Will definitely buy again!",
        img: "./images/rachael.jpg",
        rating: 4
      },
    ];
  
    return (
      <section className="testimonials">
        <h2>What Our Customers Say</h2>
        <div className="testimonial-grid">
          {reviews.map((review, index) => (
            <div key={index} className="testimonial-card">
              <img src={review.img} alt={review.name} />
              <p>{review.review}</p>
              <div className="rating">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} className={i < review.rating ? "star filled" : "star"}>★</span>
                ))}
              </div>
              <h3>- {review.name}</h3>
            </div>
          ))}
        </div>
      </section>
    );
};

export default Testimonials;
