import axios from 'axios';

const API_KEY = 'your_alpha_vantage_api_key';
const BASE_URL = 'https://www.alphavantage.co/query';

export const fetchStockData = (symbol: string) => 
    axios.get(BASE_URL, {
        params: {
            function: 'TIME_SERIES_DAILY',
            symbol: symbol,
            apikey: API_KEY
        }
    })
    .then(response => response.data)
    .catch(error => {
        console.error('Error fetching stock data:', error);
        throw error;
    });