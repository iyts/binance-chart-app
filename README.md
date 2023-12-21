# Binance Chart App

This repository contains a ReactJS app that utilizes the official Binance API documentation to display a live chart with kline data. The chart is updated in real-time using websockets, providing an interactive and dynamic user experience.

## Features

- **Chart Display:** Shows a live chart based on the kline data from Binance APIs.
- **Time Interval Buttons:** Allows users to modify the time intervals according to their specifications.
- **Customizable Symbols:** Symbols displayed on the chart are customizable, and you can modify them to suit your preferences.

## Getting Started

To run this app locally, follow these steps:

1. Clone this repository to your local machine.
2. Install the required dependencies by running `npm install`.
3. Run the app in development mode using the command `npm start`.
4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Data Source

The current symbols used in the app are fetched from Binance's API through the following URL: [https://fapi.binance.com/fapi/v1/exchangeInfo](https://fapi.binance.com/fapi/v1/exchangeInfo).

## Live Example

Check out the live example of this app [here](https://binance-chart-1jryilr01-iyts-projects.vercel.app/).

Feel free to explore and customize the app to meet your specific requirements!
