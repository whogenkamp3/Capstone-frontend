import React from 'react';
import Header from './Header';

const Home = () => {
  return (
    <div className="home-container">
      {/* Include Header here */}
      <Header />

      <div className="home-content">
        <h2>Welcome to the Home Page</h2>
      </div>
    </div>
  );
};

export default Home;
