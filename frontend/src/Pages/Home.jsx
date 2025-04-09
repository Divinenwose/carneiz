import React from "react";
import Hero from "../Components/Hero/Hero";
import FeaturedProducts from "../Components/Featured Products/FeaturedProducts";
import FeaturedCategories from "../Components/Featured Categories/FeaturedCategories";
import Testimonials from "../Components/Testimonials/Testimonials";
import CallToAction from "../Components/Call To Action/CallToAction";
import Footer from "../Components/footer/footer";

const Home = ({addToCart, cartItems}) => {
  return (
    <div>

      <Hero />
      <FeaturedProducts addToCart={addToCart} cartItems={cartItems}  />
      <FeaturedCategories />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Home;
