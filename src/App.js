import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import InitialPage from './pages/InitialPage';
import Login from './pages/Login';
import CommunicationPage from './pages/CommunicationPage';
import './App.css';
import { auth } from './firebase/firebase'; // Make sure this path matches your actual file structure


const App = () => {
  const [user, setUser] = useState(null);

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser); // Update user state
    });

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  return (
    <Router>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<InitialPage />} />
          <Route path="/home" element={user ? <Home /> : <Login />} />
          <Route path="/communication" element={<CommunicationPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
