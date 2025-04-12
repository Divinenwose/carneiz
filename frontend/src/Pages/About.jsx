import React from 'react';
import './About.css';
import { useNavigate } from "react-router-dom";
import Footer from '../Components/footer/footer';
import Slider from "react-slick"; 

const About = () => {
  const navigate = useNavigate();

  const handleShopNowClick = () => {
    navigate("/Product");
    window.scrollTo(0, 0); 
  };

  const chooseItems = [
    {
      icon: (
        <Slider {...{
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          autoplay: true,
          autoplaySpeed: 2000,
        }}>
          <div><img src='./images/beef chuck.png' alt="Organic Meat 1" /></div>
          <div><img src='./images/chicken thigh.png' alt="Organic Meat 2" /></div>
          <div><img src='./images/goat shoulder.png' alt="Organic Meat 3" /></div>
          <div><img src='./images/pork hock.png' alt="Organic Meat 4" /></div>
          <div><img src='./images/goat shoulder.png' alt="Organic Meat 5" /></div>
          <div><img src='./images/catfish.jpg' alt="Organic Fish" /></div>
        </Slider>
      ),
      title: '100% Organic Product',
      description: 'We provide fresh, high-quality, and well-cut meat and fish products to enhance your meals.',
    },
    {
      icon: <img src='./images/rider.png' alt="Fast Delivery Service" />,
      title: 'Fast Delivery Service',
      description: 'Enjoy quick and efficient delivery straight to your doorstep.',
    },
    {
      icon: <img src='./images/thyme.png' alt="Exquisite Spices" />,
      title: 'Exquisite Spices',
      description: 'Elevate your cooking with our diverse selection of authentic spices.',
    },
    {
      icon: <img src='./images/time.jpg' alt="Save Time" />,
      title: 'Save Time',
      description: 'Spend less time shopping and more time savoring delicious meals.',
    },
    {
      icon: <img src='./images/guarantee.jpg' alt="Guaranteed Quality" />,
      title: 'Guaranteed Quality',
      description: 'We ensure premium quality in every product you purchase.',
    },
  ];


  return (
    <div className="about-section">
      <div className="about-banner">
        <div className="about-banner-content">
          <h1>About Us</h1>
        </div>
      </div>
      <div className="company-description">
        <h2>Discover Our Story</h2>
        <div className="accent-line"></div>
        <p>
          We believe in bringing premium quality, fresh meats, and handpicked spices straight to your table. 
          At <strong>Carneiz</strong>, excellence is not just a goal — it's our standard. 
          Join us in redefining how you experience meals at home.
        </p>
      </div>
      <div className="why-choose-section">
        <div className="container">
          <h2>Why Choose Us</h2>
          <div className="choose-grid">
            {chooseItems.map((item, index) => (
              <div className="choose-item" key={index}>
                <div className="choose-icon">
                  {item.icon}
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="walk-in-store">
        <h2>Visit Our Walk-In Store</h2>
        <p>
          Experience the finest selection of fresh meats and spices in person! 
          Our walk-in store is located at Owerri MCC Road, where quality meets convenience.
        </p>
        <div className="store-icon">
          <img src="./images/walk in store.png" alt="Walk-In Store Icon" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
