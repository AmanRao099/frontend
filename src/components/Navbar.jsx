import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase/firebase'; // Importing Firebase auth
import './Navbar.css';

const Navbar = () => {
  const [user, setUser] = useState(null); // State to store the authenticated user

  // Check if the user is logged in when the component mounts
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser); // Firebase authentication listener
    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  const handleLogout = () => {
    auth.signOut(); // Sign out the user
    setUser(null); // Reset the user state
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">
          Service Platform
        </Link>
      </div>
      <div className="navbar-right">
        <ul className="navbar-links">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/communication">Communication</Link>
          </li>
          {/* Show Login or Logout based on user status */}
          <li>
            {user ? (
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
        </ul>

        {/* Show user avatar if logged in */}
        {user && (
          <div className="user-profile">
            <img
              src={user.photoURL || '/default-avatar.png'} // Display profile photo or a default image
              alt="User Profile"
              className="user-avatar"
            />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
