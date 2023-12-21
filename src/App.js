import React, { useState } from 'react';
import Chart from './components/Chart';
import IntervalButtons from './components/IntervalButtons';
import TickerInput from './components/TickerInput';

const App = () => {
  const [interval, setInterval] = useState('1h');
  const [ticker, setTicker] = useState('BTCUSDT');

  // Define the intervals array
  const intervals = ['1m', '5m', '15m', '1h', '4h']; // Add or modify intervals as needed

  console.log('Current ticker in App:', ticker); // Debugging: Log the current ticker state

  const handleSymbolSelect = (selectedSymbol) => {
    console.log('Selected Symbol in handleSymbolSelect:', selectedSymbol); // Debugging
    setTicker(selectedSymbol);
  };

  return (
    <div>
      <TickerInput onSymbolSelect={handleSymbolSelect} />
      <IntervalButtons intervals={intervals} selectedInterval={interval} onChange={setInterval} />
      <Chart interval={interval} ticker={ticker} />
    </div>
  );
};

export default App;