// src/Humidity.js
import React from 'react';
// import './Humidity.css';

const Humidity = ({ humidity }) => {
  return (
    <div className="circle">
      <div className="round" style={{ height: `${humidity}%` }}></div>
    </div>
  );
};

export default Humidity;
