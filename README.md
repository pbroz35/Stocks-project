# Stock Dashboard with AI Integration
![Screenshot from 2024-08-23 11-10-20](https://github.com/user-attachments/assets/62307e81-f4fe-4148-b225-c6455cc8189b)

## Overview
This project is a Stock Dashboard that provides real-time stock price information, an interactive graph, recent news articles, and AI-driven stock purchase predictions. It leverages the power of various APIs and AI models to give users a comprehensive view of their chosen stocks, aiding them in making informed investment decisions.

## Features
- **Interactive Graph**: Displays the stock's price history with the ability to zoom and hover over data points for detailed information.
- **Real-Time Stock Information**: Shows the ticker symbol, current price, and recent changes.
- **News Integration**: Fetches and displays the latest news articles related to the selected stock.
- **AI Stock Prediction**: Analyzes recent news articles using Llama3 AI API to predict if a stock is a good purchase, filtering out irrelevant or poorly formatted data through web scraping.
- **Finnhub & NewsAPI Integration**: Retrieves financial data and news articles through Finnhub API and NewsAPI.




## Technologies Used
- **Frontend**: React, Vite
- **Backend**: Node.js, Express
- **APIs**: Finnhub API, NewsAPI, Llama3 AI API
- **Web Scraping**: Filters and formats news article data for accurate AI analysis.

## Getting Started
To get started with the project, clone the repository and follow the installation instructions in the `README.md`. Make sure to set up your API keys for Finnhub, NewsAPI, and Llama3 in the `.env` file.

```sh
git clone https://github.com/your-username/stock-dashboard-ai.git
cd stock-dashboard-ai
npm install
npm run dev
