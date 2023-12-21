// TickerInput.js
import React, { useEffect, useState } from 'react';

const TickerInput = ({ onSymbolSelect }) => {
    const [symbols, setSymbols] = useState([]);
    const [selectedSymbol, setSelectedSymbol] = useState('');

    useEffect(() => {
        fetch('https://fapi.binance.com/fapi/v1/exchangeInfo')
            .then(response => response.json())
            .then(data => {
                const symbolOptions = data.symbols.map(symbol => symbol.symbol);
                setSymbols(symbolOptions);
                
                if (symbolOptions.length > 0) {
                    // Only set the selected symbol if it is not already set
                    if (!selectedSymbol) {
                        setSelectedSymbol(symbolOptions[0]);
                        onSymbolSelect(symbolOptions[0]);
                    }
                }
            })
            .catch(error => {
                console.error('Error fetching symbols:', error);
            });
    }, [onSymbolSelect, selectedSymbol]);

    const handleSelectChange = (event) => {
        const newSymbol = event.target.value;
        setSelectedSymbol(newSymbol);
        onSymbolSelect(newSymbol);
    }

    return (
        <div>
            <label htmlFor="symbol-selector">Select Symbol: </label>
            <select id="symbol-selector" value={selectedSymbol} onChange={handleSelectChange}>
                {symbols.map(symbol => (
                    <option key={symbol} value={symbol}>{symbol}</option>
                ))}
            </select>
        </div>
    );
};

export default TickerInput;
