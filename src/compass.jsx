// src/Compass.js
import React from 'react';
// import './Compass.css';

const Compass = ({ degree }) => {
  return (
    <div className="compass">
      <p>N</p>
      <div className="arrow" style={{ transform: `translate(-50%, -100%) rotate(${degree}deg)` }}></div>
    </div>
  );
};

export default Compass;
