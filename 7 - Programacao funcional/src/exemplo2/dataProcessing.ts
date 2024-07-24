interface TimeSeries {
    [date: string]: {
        '1. open': string;
        '2. high': string;
        '3. low': string;
        '4. close': string;
        '5. volume': string;
    };
}

export const extractClosePrices = (timeSeries: TimeSeries) => 
    Object.entries(timeSeries).map(([date, values]) => ({
        date,
        close: parseFloat(values['4. close'])
    }));

export const filterRecentPrices = (prices: { date: string, close: number }[], days: number) => 
    prices.slice(0, days);

export const formatPrices = (prices: { date: string, close: number }[]) =>
    prices.map(price => `Date: ${price.date}, Close: $${price.close}`);