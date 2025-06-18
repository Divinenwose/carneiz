import React, { useEffect, useState } from 'react';
import './FeaturedProducts.css';

const FeaturedProducts = ({ addToCart }) => { 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}api/product/featured`);
      if (!response.ok) throw new Error('Failed to fetch products');
      const jsonResponse = await response.json();
      setProducts(jsonResponse.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="featured-products">
      <h2>Featured Products</h2>
      <p className="featured-description">
        Explore our selection of premium meats, ranging from classic cuts to exotic delicacies.
        We source only the highest quality products to ensure an exceptional dining experience.
        Browse our collection and add your favourites to the cart!
      </p>

      {loading && <p>Loading products...</p>}
      {error && <p className="error">Error: {error}</p>}

      <div className="product-grid">
        {!loading && !error && products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="product-card">
              <img 
                src={product.image ? `${import.meta.env.VITE_API_URL}images/${product.image}` : './images/default.png'} 
                alt={product.name} 
                onError={(e) => e.target.src = './images/default.png'} 
              />
              <h3>{product.name}</h3>
              <p className="product-price">
                ₦{product.price.toFixed(2)}
                {(["beef", "turkey", "pork", "goat meat", "chicken", "gizzard"].includes(product.category.toLowerCase())) && "/kg"}
              </p>
              <button onClick={() => addToCart(product)}>Add to Cart</button> 
            </div>
          ))
        ) : (
          !loading && !error && <p>No featured products available.</p>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
