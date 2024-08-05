import { ITransformedPriceChange } from "./TransformedPriceChange.interface";

export interface ITransformedCoinsMarketData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: string;
  total_volume: string;
  market_cap: string;
  market_cap_rank: number | '-';
  sparkline_in_7d: {
    price: number[]
  }
  price_change_percentage_1h_in_currency: ITransformedPriceChange;
  price_change_percentage_24h_in_currency: ITransformedPriceChange;
  price_change_percentage_7d_in_currency: ITransformedPriceChange;
}
