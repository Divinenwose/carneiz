import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FeaturedCategories.css';

const FeaturedCategories = () => {
  const navigate = useNavigate();

  const categories = [
    { name: "Beef", img: "./images/brisket.png" },
    { name: "Chicken", img: "./images/chicken thigh.png" },
    { name: "Pork", img: "./images/pork hock.png" },
    { name: "Spices", img: "./images/locust bean.png" },
    { name: "Goat Meat", img: "./images/goat loin.png" },
    { name: "Turkey", img: "./images/turkey.jpg" },
    { name: "Cat Fish", img: "./images/catfish.jpg" }
  ];

  const handleCategoryClick = () => {
    navigate('/product');
    setTimeout(() => {
      const topOfPage = document.getElementById('top-of-product-page');
      if (topOfPage) {
        topOfPage.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <section className="featured-categories">
      <h2>Shop by Category</h2>
      <p className="category-description">
        Explore our diverse selection of premium meats and flavorful spices. 
        Whether you're looking for fresh beef, chicken, seafood, or rich aromatic spices, 
        we have everything to elevate your cooking experience.
      </p>
      <div className="category-grid">
        {categories.map((category, index) => (
          <div key={index} className="category-card">
            <img src={category.img} alt={category.name} />
            <h3>{category.name}</h3>
            <button onClick={handleCategoryClick}>View Products</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCategories;
