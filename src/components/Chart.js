import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createChart } from 'lightweight-charts';
import axios from 'axios';

const intervalToSeconds = (interval) => {
  const unit = interval.slice(-1);
  const value = parseInt(interval.slice(0, -1), 10);

  switch (unit) {
    case 'm':
      return value * 60;
    case 'h':
      return value * 3600;
    default:
      return value;
  }
};

const Chart = ({ interval, ticker }) => {
  const chartContainerRef = useRef(null);
  const [chart, setChart] = useState(null);
  const [candlestickData, setCandlestickData] = useState([]);
  const wsRef = useRef(null);
  const candlestickSeriesRef = useRef(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`https://api.binance.com/api/v3/klines?symbol=${ticker}&interval=${interval}`);
      const klineData = response.data.map((k) => ({
        time: k[0] / 1000,
        open: parseFloat(k[1]),
        high: parseFloat(k[2]),
        low: parseFloat(k[3]),
        close: parseFloat(k[4]),
      }));
      setCandlestickData(klineData);
      candlestickSeriesRef.current.setData(klineData);
    } catch (error) {
      console.error('Error fetching kline data:', error);
    }
  }, [ticker, interval]);

  useEffect(() => {
    const chartInstance = createChart(chartContainerRef.current, { width: 600, height: 400 });
    const candleSeries = chartInstance.addCandlestickSeries();
    candlestickSeriesRef.current = candleSeries;
    setChart(chartInstance);

    return () => chartInstance.remove();
  }, [fetchData]);

  useEffect(() => {
    const connectWebSocket = () => {
      wsRef.current = new WebSocket(`wss://stream.binance.com:9443/ws/${ticker.toLowerCase()}@aggTrade`);
    };

    const handleWebSocketOpen = () => {
      console.log('WebSocket connection opened');
      fetchData();
    };

    const handleWebSocketMessage = (event) => {
      console.log('WebSocket message received:', event.data);
      const trade = JSON.parse(event.data);
      const tradeTime = trade.T / 1000;
      const tradePrice = parseFloat(trade.p);

      let newCandle;
      if (candlestickData.length > 0) {
        const lastCandle = candlestickData[candlestickData.length - 1];
        if (tradeTime >= lastCandle.time && tradeTime < lastCandle.time + intervalToSeconds(interval)) {
          newCandle = {
            ...lastCandle,
            close: tradePrice,
            high: Math.max(lastCandle.high, tradePrice),
            low: Math.min(lastCandle.low, tradePrice),
          };
        } else {
          newCandle = {
            time: tradeTime,
            open: tradePrice,
            high: tradePrice,
            low: tradePrice,
            close: tradePrice,
          };
        }
      } else {
        newCandle = {
          time: tradeTime,
          open: tradePrice,
          high: tradePrice,
          low: tradePrice,
          close: tradePrice,
        };
      }

      setCandlestickData((prevData) => [...prevData, newCandle]);
      candlestickSeriesRef.current.update(newCandle);
    };

    const handleWebSocketError = (error) => {
      console.error('WebSocket Error:', error);
    };

    const handleWebSocketClose = (event) => {
      console.log('WebSocket connection closed:', event);
    
      if (event.code !== 1000) {
        console.log('Reconnecting...');
        setTimeout(() => connectWebSocket(), 10000); // Retry after 10 seconds
      }
    };
    

    connectWebSocket();

    const ws = wsRef.current;
    ws.addEventListener('open', handleWebSocketOpen);
    ws.addEventListener('message', handleWebSocketMessage);
    ws.addEventListener('error', handleWebSocketError);
    ws.addEventListener('close', handleWebSocketClose);

    return () => {
      ws.removeEventListener('open', handleWebSocketOpen);
      ws.removeEventListener('message', handleWebSocketMessage);
      ws.removeEventListener('error', handleWebSocketError);
      ws.removeEventListener('close', handleWebSocketClose);
      ws.close();
    };
  }, [ticker, interval, candlestickData, fetchData]);

  useEffect(() => {
    if (chart) {
      fetchData();
    }
  }, [chart, fetchData]);

  return <div ref={chartContainerRef} />;
};

export default Chart;
