import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Service Platform</h1>
      <div>
        <a href="/">Home</a>
        <a href="/about">About</a>
      </div>
    </nav>
  );
};

export default Navbar;
