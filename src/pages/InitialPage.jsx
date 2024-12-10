import React from 'react';
import './InitialPage.css';

const InitialPage = () => {
  return (
    <div className="initial-page">
      <h1>Welcome to the Service Platform</h1>
      <p>Explore our services in 3D!</p>

      {/* Spline model iframe */}
      <div className="spline-container">
        <iframe
          src="YOUR_SPLINE_EMBED_URL_HERE" // Replace with your actual Spline embed URL
          frameBorder="0"
          width="100%"
          height="600px"
          title="3D Model"
        ></iframe>
      </div>
    </div>
  );
};

export default InitialPage;
