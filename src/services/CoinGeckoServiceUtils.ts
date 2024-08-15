import {
  ICoinsMarketData,
  ITransformedCoinsMarketData,
} from "../models";

export const transformCoinsListWithMarketData = (
  data: ICoinsMarketData[]
): ITransformedCoinsMarketData[] => {
  return data.map(
    ({
      id,
      symbol,
      name,
      image,
      current_price,
      total_volume,
      market_cap,
      market_cap_rank,
      sparkline_in_7d,
      price_change_percentage_1h_in_currency,
      price_change_percentage_24h_in_currency,
      price_change_percentage_7d_in_currency,
    }) => ({
      id,
      symbol,
      name,
      image,
      current_price,
      total_volume,
      market_cap,
      market_cap_rank,
      sparkline_in_7d,
      price_change_percentage_1h_in_currency,
      price_change_percentage_24h_in_currency,
      price_change_percentage_7d_in_currency,
    })
  );
};