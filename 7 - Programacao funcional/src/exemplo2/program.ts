import { fetchStockData } from './alphaVantage';
import { extractClosePrices, filterRecentPrices, formatPrices } from './dataProcessing';

const symbol = 'AAPL';
const days = 5;

const getRecentClosingPrices = (symbol: string, days: number) => 
    fetchStockData(symbol)
        .then(data => data['Time Series (Daily)'])
        .then(extractClosePrices)
        .then(prices => filterRecentPrices(prices, days))
        .then(formatPrices);

getRecentClosingPrices(symbol, days)
    .then(recentPrices => 
        recentPrices.forEach(price => console.log(price))
    )
    .catch(error => console.error('Error displaying stock data:', error));
