import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-title">
          Service Platform
        </Link>

        <div className="menu-icon" onClick={toggleMenu}>
          <div className="menu-bar"></div>
          <div className="menu-bar"></div>
          <div className="menu-bar"></div>
        </div>

        <div className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/ac-technicians">AC Technicians</Link>
          <Link to="/electricians">Electricians</Link>
          <Link to="/plumbers">Plumbers</Link>
          <Link to="/mechanics">Mechanics</Link>
          <Link to="/carpenters">Carpenters</Link>
          <Link to="/technicians">Technicians</Link>
          <Link to="/cleaning-pest-control">Cleaning & Pest Control</Link>
          <Link to="/home-appliances-repair">Home Appliances Repair</Link>
          <Link to="/building-paintings">Building Paintings</Link>
          <Link to="/other-services">Other Services</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
