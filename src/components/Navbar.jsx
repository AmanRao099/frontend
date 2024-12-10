import React, { useState, useEffect } from 'react';
import { auth } from '../firebase/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import './Navbar.css';

const NavBar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('Successfully logged out!');
      setUser(null);
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-logo">My App</h1>
      <div className="navbar-right">
        {user ? (
          <div className="user-section">
            <img
              src={user.photoURL}
              alt="Profile"
              className="navbar-pfp"
              title={user.displayName}
            />
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <button className="login-btn">Login</button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
