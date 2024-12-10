import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h2>Welcome to the Service Platform!</h2>
      <p>Your one-stop solution for all service needs, including:</p>
      <ul>
        <li>AC technicians</li>
        <li>Electricians</li>
        <li>Plumbers</li>
        <li>Mechanics</li>
        <li>Carpenters</li>
        <li>Cleaning and Pest Control</li>
      </ul>
    </div>
  );
};

export default Home;
