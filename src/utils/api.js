import axios from "axios";

// export const CoinList = (currency) =>
//     `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

// export const SingleCoin = (id) =>
//     `https://api.coingecko.com/api/v3/coins/${id}`;

// export const HistoricalChart = (id, days = 365, currency) =>
//     `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

// export const TrendingCoins = (currency) =>
//     `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;

const BASE_URL = "https://api.coingecko.com/api/v3/coins";
//url --> markets, id/market_chart, id
export const fetchApiData = async (url, currency, perPage, days) => {
    try{
        const { data } = await axios.get(`${BASE_URL}/${url}`, {
            method: "GET",
            params: {
                vs_currency: currency,
                order: 'gecko_desc',
                per_page: perPage,
                page: 1,
                sparkline: false,
                price_change_percentage: '24h',
                days,
            },
            headers: {
                'Content-Type': 'application/json'
            },
        })
        return data;
    }catch(err){
        return err;
    }
}