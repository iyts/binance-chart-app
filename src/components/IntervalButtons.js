// src/components/IntervalButtons.js
import React from 'react';

const IntervalButtons = ({ intervals, selectedInterval, onChange }) => {
  return (
    <div>
      {intervals.map((interval) => (
        <button
          key={interval}
          onClick={() => onChange(interval)}
          disabled={interval === selectedInterval}
        >
          {interval}
        </button>
      ))}
    </div>
  );
};

export default IntervalButtons;
