import {
  ICoinsMarketData,
  ITransformedCoinsMarketData,
  TCoinHistoricalChartItem,
} from "../models";
import {
  formatCurrencyValue,
  formatDate,
  getMinMaxValue,
} from "./CryptoTableUtils";

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
      market_cap,
      market_cap_rank,
      fully_diluted_valuation,
      total_volume,
      high_24h,
      low_24h,
      circulating_supply,
      total_supply,
      max_supply,
      ath,
      ath_change_percentage,
      ath_date,
      atl,
      atl_change_percentage,
      atl_date,
      sparkline_in_7d,
      price_change_percentage_1h_in_currency,
      price_change_percentage_24h_in_currency,
      price_change_percentage_7d_in_currency,
      price_change_percentage_14d_in_currency,
      price_change_percentage_30d_in_currency,
      price_change_percentage_1y_in_currency,
    }) => ({
      id,
      symbol,
      name,
      image,
      current_price,
      current_price_formatted: formatCurrencyValue(current_price, "$"),
      market_cap,
      market_cap_formatted: {
        label: "Market Cap",
        price: formatCurrencyValue(market_cap, "$"),
      },
      market_cap_rank,
      fully_diluted_valuation: {
        label: "Fully Diluted Valuation",
        price: formatCurrencyValue(fully_diluted_valuation, "$"),
      },
      total_volume,
      trading_volume_24h: {
        label: "24 Hour Trading Vol",
        price: formatCurrencyValue(total_volume, "$"),
      },
      circulating_supply: {
        label: "Circulating Supply",
        price: formatCurrencyValue(circulating_supply),
      },
      total_supply: {
        label: "Total Supply",
        price: formatCurrencyValue(total_supply),
      },
      max_supply: {
        label: "Max Supply",
        price: formatCurrencyValue(max_supply),
      },
      range_24h: {
        label: "24h Range",
        price:
          formatCurrencyValue(low_24h, "$") +
          "-" +
          formatCurrencyValue(high_24h, "$"),
      },
      range_7d: {
        label: "7d Range",
        price:
          formatCurrencyValue(getMinMaxValue(sparkline_in_7d.price).min, "$") +
          "-" +
          formatCurrencyValue(getMinMaxValue(sparkline_in_7d.price).max, "$"),
      },
      ath: {
        label: "All-Time High",
        price: formatCurrencyValue(ath, "$"),
        percentage: ath_change_percentage,
        date: formatDate(ath_date),
      },
      atl: {
        label: "All-Time Low",
        price: formatCurrencyValue(atl, "$"),
        percentage: atl_change_percentage,
        date: formatDate(atl_date),
      },
      sparkline_in_7d,
      price_change_percentage_1h_in_currency,
      price_change_percentage_24h_in_currency,
      price_change_percentage_7d_in_currency,
      price_change_percentage_14d_in_currency,
      price_change_percentage_30d_in_currency,
      price_change_percentage_1y_in_currency,
    })
  );
};

const extractTimestamps = (data: TCoinHistoricalChartItem[]): number[] =>
  data.map((item) => item[0]);

const extractValues = (data: TCoinHistoricalChartItem[]): number[] =>
  data.map((item) => item[1]);
