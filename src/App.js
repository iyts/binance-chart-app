// src/App.js
import React, { useState } from 'react';
import Chart from './components/Chart';
import IntervalButtons from './components/IntervalButtons';
import TickerInput from './components/TickerInput';

const App = () => {
  const [interval, setInterval] = useState('1h');
  const [ticker, setTicker] = useState('BTCUSDT');

  const intervals = ['1m', '5m', '15m', '1h', '4h']; // Add more as needed

  return (
    <div>
      <TickerInput ticker={ticker} onChange={setTicker} />
      <IntervalButtons intervals={intervals} selectedInterval={interval} onChange={setInterval} />
      <Chart interval={interval} ticker={ticker} />
    </div>
  );
};

export default App;
