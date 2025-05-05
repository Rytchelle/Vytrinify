// src/components/Loader.jsx
import React from 'react';
import '../styles/Loader.css';

function Loader() {
  return (
    <div className="loader-overlay">
      <div className="dot-loader">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}

export default Loader;
