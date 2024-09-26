import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleShopNowClick = () => {
    navigate('/login'); // Navigate to the login page
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to Our Products</h1>
        <p>We offer the best silver rings.</p>
        <button onClick={handleShopNowClick}>Shop Now</button>
      </section>
    </div>
  );
};

export default Home;
