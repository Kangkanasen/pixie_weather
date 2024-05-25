import React from 'react';

const PressureGauge = ({ pressure }) => {
    const minValue = 950;
    const maxValue = 1085;
    const range = maxValue - minValue;
    const valuePercentage = ((pressure - minValue) / range) * 100;

    return (
        <div className="gauge">
            
            <svg width="200" height="150" viewBox="0 0 200 100">
                <path
                    className="foreground"
                    d="M10,90 A80,80 0 0,1 190,90"
                    fill="none"
                    stroke="#e7e9e8"
                    strokeWidth="6"
                />
                <path
                    
                    d="M10,90 A80,80 0 0,1 190,90"
                    fill="none"
                    stroke="#000"
                    strokeWidth="6"
                    strokeDasharray={`${valuePercentage * 2.53}, 1000`}
                />
                <circle cx="100" cy="90" r="6" fill="#fff" stroke="none" strokeWidth="5" />
                 </svg>
        </div>
    );
};

export default PressureGauge;
