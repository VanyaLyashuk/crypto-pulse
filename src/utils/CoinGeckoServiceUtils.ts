import {
  ICoinsMarketData,
  IPeriodMapData,
  ITransformedCoinsMarketData,
  TCoinHistoricalChartItem,
  TCoinInfoTimeRange,
} from "../models";
import {
  formatCurrencyValue,
  formatDate,
  formatTwoDigits,
  getMinMaxValue,
  getShortMonthName,
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
      market_cap_rank,
      total_volume,
      sparkline_in_7d,
      price_change_percentage_1h_in_currency,
      price_change_percentage_24h_in_currency,
      price_change_percentage_7d_in_currency,
      price_change_percentage_14d_in_currency,
      price_change_percentage_30d_in_currency,
      price_change_percentage_1y_in_currency,
      coin_statistics: {
        market_cap_formatted: {
          label: "Market Cap",
          price: formatCurrencyValue(market_cap, "$"),
        },
        fully_diluted_valuation: {
          label: "Fully Diluted Valuation",
          price: formatCurrencyValue(fully_diluted_valuation, "$"),
        },
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
      },
      coin_historical_price: {
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
            formatCurrencyValue(
              getMinMaxValue(sparkline_in_7d.price).min,
              "$"
            ) +
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
      },
    })
  );
};

const formatLabel = (date: Date, period: TCoinInfoTimeRange) => {
  const year = date.getFullYear().toString().slice(-2);
  const month = getShortMonthName(date.getMonth());
  const day = date.getDate();
  const hours = formatTwoDigits(date.getHours());

  switch (period) {
    case "7d":
    case "1m":
    case "3m":
      return `${day}. ${month}`;
    case "1y":
      return `${month} '${year}`;
    case "24h":
      return hours === "00" ? `${day}. ${month}` : `${hours}:00`;
    default:
      return `${hours}:00`;
  }
};

const extractTimestamps = (data: TCoinHistoricalChartItem[]): number[] =>
  data.map((item) => item[0]);

const extractValues = (data: TCoinHistoricalChartItem[]): number[] =>
  data.map((item) => item[1]);

export const generateXAxisLabels = (
  startTimestamp: number,
  endTimestamp: number
): string[] => {
  const labels: string[] = [];
  const duration = endTimestamp - startTimestamp;

  const periodMap: IPeriodMapData[] = [
    { maxDuration: 24 * 3600 * 1000, interval: 3 * 3600 * 1000, period: "24h" },
    {
      maxDuration: 7 * 24 * 3600 * 1000,
      interval: 24 * 3600 * 1000,
      period: "7d",
    },
    {
      maxDuration: 30 * 24 * 3600 * 1000,
      interval: 4 * 24 * 3600 * 1000,
      period: "1m",
    },
    {
      maxDuration: 90 * 24 * 3600 * 1000,
      interval: 12 * 24 * 3600 * 1000,
      period: "3m",
    },
    { maxDuration: Infinity, interval: 30 * 24 * 3600 * 1000, period: "1y" },
  ];

  const { interval, period } =
    periodMap.find(({ maxDuration }) => duration <= maxDuration) ||
    periodMap[0];

  const current = new Date(endTimestamp);

  while (current.getTime() >= startTimestamp && labels.length <= 11) {
    if (current.getHours() <= 1) {
      current.setHours(0);
      current.setMinutes(0);
      labels.push(formatLabel(current, period));
      current.setTime(current.getTime() - interval);
    } else {
      labels.push(formatLabel(current, period));
      current.setTime(current.getTime() - interval);
    }
  }

  return labels.reverse();
};
