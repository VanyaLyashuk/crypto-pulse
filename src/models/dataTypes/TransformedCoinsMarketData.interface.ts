export interface ITransformedCoinsMarketData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  total_volume: number;
  market_cap: number;
  market_cap_rank: number;
  sparkline_in_7d: {
    price: number[]
  }
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
}
