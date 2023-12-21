// src/components/TickerInput.js
import React from 'react';

const TickerInput = ({ ticker, onChange }) => {
  return (
    <div>
      <label>Ticker: </label>
      <input type="text" value={ticker} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
};

export default TickerInput;
