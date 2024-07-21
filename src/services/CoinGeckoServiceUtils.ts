import {
  ICoinHistoricalChartData,
  ICoinsMarketData,
  ITransformedCoinHistoricalChartData,
  ITransformedCoinsMarketData,
  ITransformedPriceChange,
} from "../models";

export const transformCoinsListWithMarketData = (
  data: ICoinsMarketData[]
): ITransformedCoinsMarketData[] => {
  const currency = "$";

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
      price_change_percentage_1h_in_currency,
      price_change_percentage_24h_in_currency,
      price_change_percentage_7d_in_currency,
    }) => ({
      id,
      symbol,
      name,
      image,
      current_price: formatCurrencyValue(current_price, currency, {
        minimumFractionDigits: 2,
      }),
      total_volume: formatCurrencyValue(total_volume, currency),
      market_cap: formatCurrencyValue(market_cap, currency),
      market_cap_rank: market_cap_rank,
      price_change_percentage_1h_in_currency: transformPriceChange(
        price_change_percentage_1h_in_currency
      ),
      price_change_percentage_24h_in_currency: transformPriceChange(
        price_change_percentage_24h_in_currency
      ),
      price_change_percentage_7d_in_currency: transformPriceChange(
        price_change_percentage_7d_in_currency
      ),
    })
  );
};

export const transformCoinHistoricalChartData = (
  data: ICoinHistoricalChartData
): ITransformedCoinHistoricalChartData => {
  return {
    prices: data.prices.map(item => item[1])
  }
};

function transformPriceChange(change: number): ITransformedPriceChange {
  return {
    value: formatPercentageValue(change),
    isNegative: change < 0,
  };
}

function formatCurrencyValue(
  value: number,
  currency: string,
  options?: Intl.NumberFormatOptions
): string {
  if (options) {
    return currency + value.toLocaleString("en-US", options);
  }
  return currency + value.toLocaleString("en-US");
}

function formatPercentageValue(value: number): string {
  return `${Math.abs(value).toFixed(1)}%`;
}
