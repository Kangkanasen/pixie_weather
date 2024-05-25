import React from 'react';
import './Loader.css'; // Import CSS file for styling

const Loader = () => {
  return (
    <>
        <div className="loader-overlay">
    <div className="newtons-cradle">
      <div className="newtons-cradle__dot"></div>
      <div className="newtons-cradle__dot"></div>
      <div className="newtons-cradle__dot"></div>
      <div className="newtons-cradle__dot"></div>
    </div>

      </div>
      </>
  );
};

export default Loader;
