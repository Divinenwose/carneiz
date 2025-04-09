import React from "react";
import './Hero.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { Link } from "react-router-dom";

const Hero = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, 
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <Slider {...settings}>
      <div className="slider-item">
        <img src="/images/image1.png" alt="" className="slider-image" />
        <div className="slider-text">
          <h2>Savor the Finest Cuts</h2>
          <p>Handpicked, high-quality meats for every occasion. Elevate your meals with the juiciest, most flavorful selections.</p>
          <Link to="/product" className="learn-more-button">Explore Now</Link>
        </div>
      </div>
      <div className="slider-item">
        <img src="/images/image2.png" alt="" className="slider-image" />
        <div className="slider-text">
          <h2>Premium Meats, Unmatched Quality</h2>
          <p>From farm to table, enjoy the richest flavors and tenderness in every bite. Experience excellence in every cut.</p>
          <Link to="/product" className="learn-more-button">Shop Now</Link>
        </div>
      </div>
      <div className="slider-item">
        <img src="/images/image3.png" alt="" className="slider-image" />
        <div className="slider-text">
          <h2>Delicious Savings Await!</h2>
          <p>Stock up on your favorite meats and spices at unbeatable prices. Don't miss out—shop the best deals today!</p>
          <Link to="/product" className="learn-more-button">Grab Your Deal</Link>
        </div>
      </div>
      <div className="slider-item">
        <img src="/images/image4.png" alt="" className="slider-image" />
        <div className="slider-text">
          <h2>Big Flavors, Bigger Savings!</h2>
          <p>Indulge in top-quality meats and spices at prices you’ll love. Limited-time offers just for you!</p>
          <Link to="/product" className="learn-more-button">Claim Your Discount</Link>
        </div>
      </div>
      <div className="slider-item">
        <img src="/images/image5.png" alt="" className="slider-image" />
        <div className="slider-text">
          <h2>Spice Up Your Cooking</h2>
          <p>Unlock bold flavors and aromatic delights with our premium selection of spices. Perfect for every dish!</p>
          <Link to="/product" className="learn-more-button">Browse Spices</Link>
        </div>
      </div>
      <div className="slider-item">
        <img src="/images/image6.png" alt="" className="slider-image" />
        <div className="slider-text">
          <h2>A World of Flavors in Every Jar</h2>
          <p>From smoky BBQ rubs to exotic seasonings, find the perfect blend to bring your dishes to life.</p>
          <Link to="/product" className="learn-more-button">Discover More</Link>
        </div>
      </div>
    </Slider>
  );
}

export default Hero;
