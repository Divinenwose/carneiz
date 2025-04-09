import React, { useState, useEffect } from "react";
import "./Product.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ProductPage = ({ addToCart, cartItems }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedCategories, setSelectedCategories] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchProducts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/product/list`);
        const data = await response.json();

        if (data.success) {
          setProducts(data.data);
          const categories = data.data.reduce((acc, product) => {
            acc[product.category] = true;
            return acc;
          }, {});
          setSelectedCategories(categories);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const filteredProducts = products.filter(
    (product) =>
      selectedCategories[product.category] &&
      (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1]
  );

  return (
    <div className="product-page">
       <ToastContainer position="top-right" autoClose={3000} />
      <div className="filters">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="price-filter">
          <label>Price Range:</label>
          <input
            type="range"
            min="0"
            max="100"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
          />
          <input
            type="range"
            min="0"
            max="100"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
          />
          <span>₦{priceRange[0]} - ₦{priceRange[1]}</span>
        </div>

        <div className="category-filter">
          <h3>Categories</h3>
          {Object.keys(selectedCategories).map((category) => (
            <label key={category}>
              <input
                type="checkbox"
                checked={selectedCategories[category]}
                onChange={() => handleCategoryChange(category)}
              />
              {category}
            </label>
          ))}
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.map((product) => (
          <div className="product-card" key={product._id}>
            <img
              src={`${import.meta.env.VITE_API_URL}/images/${product.image}`}
              alt={product.name}
              loading="lazy"
            />
            <h3>{product.name}</h3>
            <p className="product-price">₦{product.price.toFixed(2)}/kg</p>
            <button
              onClick={() => {
                console.log("Product Data:", product); 
                addToCart(product);
              }}
              className="add-to-cart-btn"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
