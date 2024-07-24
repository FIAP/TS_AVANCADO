import axios from 'axios';

export class AlphaVantageService {
    private readonly apiKey: string;
    private readonly baseUrl: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://www.alphavantage.co/query';
    }

    public async fetchStockData(symbol: string): Promise<any> {
        try {
            const response = await axios.get(this.baseUrl, {
                params: {
                    function: 'TIME_SERIES_DAILY',
                    symbol: symbol,
                    apikey: this.apiKey
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching stock data:', error);
            throw error;
        }
    }
}


interface TimeSeries {
    [date: string]: {
        '1. open': string;
        '2. high': string;
        '3. low': string;
        '4. close': string;
        '5. volume': string;
    };
}

export class StockDataProcessor {
    public extractClosePrices(timeSeries: TimeSeries): { date: string, close: number }[] {
        return Object.entries(timeSeries).map(([date, values]) => ({
            date,
            close: parseFloat(values['4. close'])
        }));
    }

    public filterRecentPrices(prices: { date: string, close: number }[], days: number): { date: string, close: number }[] {
        return prices.slice(0, days);
    }

    public formatPrices(prices: { date: string, close: number }[]): string[] {
        return prices.map(price => `Date: ${price.date}, Close: $${price.close}`);
    }
}

const apiKey = 'your_alpha_vantage_api_key';
const symbol = 'AAPL';
const days = 5;

const alphaVantageService = new AlphaVantageService(apiKey);
const stockDataProcessor = new StockDataProcessor();

alphaVantageService.fetchStockData(symbol)
    .then(data => {
        const timeSeries = data['Time Series (Daily)'];
        const closePrices = stockDataProcessor.extractClosePrices(timeSeries);
        const recentPrices = stockDataProcessor.filterRecentPrices(closePrices, days);
        const formattedPrices = stockDataProcessor.formatPrices(recentPrices);

        formattedPrices.forEach(price => console.log(price));
    })
    .catch(error => console.error('Error displaying stock data:', error));