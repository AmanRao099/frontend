import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import InitialPage from './pages/InitialPage';
import Login from './pages/Login';
import CommunicationPage from './pages/CommunicationPage';
import CommunicationBubble from './components/CommunicationBubble/CommunicationBubble';
import './App.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<InitialPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/communication" element={<CommunicationPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      <Footer />
      <CommunicationBubble />
    </Router>
  );
};

export default App;
