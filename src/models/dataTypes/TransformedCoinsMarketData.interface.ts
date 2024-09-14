import { ICoinStatisticsData } from "./CoinStatisticsData.interface";
import { IHistoricalPriceData } from "./HistoricalPriceData.interface";

export interface ITransformedCoinsMarketData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  current_price_formatted: string;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  sparkline_in_7d: {
    price: number[];
  };
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  price_change_percentage_14d_in_currency: number;
  price_change_percentage_30d_in_currency: number;
  price_change_percentage_1y_in_currency: number;
  coin_statistics: ICoinStatisticsData;
  coin_historical_price: IHistoricalPriceData;
}
