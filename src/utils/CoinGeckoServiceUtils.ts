import {
  ICoinHistoricalChartDataById,
  ICoinsMarketData,
  ITransformedCoinHistoricalChartDataById,
  ITransformedCoinsMarketData,
  TChartDateFormat,
  TCoinHistoricalChartItem,
} from "../models";
import {
  formatCurrencyValue,
  formatDate,
  formatTwoDigits,
  getMinMaxValue,
  getShortMonthName,
} from "./CryptoTableUtils";

const HOUR_TIMESTAMP = 3600 * 1000;
const DAY_TIMESTAMP = 24 * HOUR_TIMESTAMP;

function defineInterval(
  duration: number,
  hourTimestamp: number,
  dayTimestamp: number
): number {
  if (duration >= 2 && duration <= 4) {
    return 6 * HOUR_TIMESTAMP;
  } else if (duration >= 5 && duration <= 9) {
    return dayTimestamp;
  } else if (duration >= 10 && duration <= 20) {
    return 2 * dayTimestamp;
  } else if (duration >= 20 && duration <= 29) {
    return 3 * dayTimestamp;
  } else if (duration >= 30 && duration <= 40) {
    return 4 * dayTimestamp;
  } else if (duration >= 41 && duration <= 130) {
    return 10 * dayTimestamp;
  } else if (duration >= 131) {
    return 30 * dayTimestamp;
  } else {
    return 3 * hourTimestamp;
  }
}
function defineFormat(duration: number): TChartDateFormat {
  if (duration >= 5 && duration <= 130) {
    return "dd. month";
  } else if (duration >= 131) {
    return "month 'year";
  } else {
    return "hours";
  }
}
function formatLabel(date: Date, format: TChartDateFormat) {
  const year = date.getFullYear().toString().slice(-2);
  const month = getShortMonthName(date.getMonth());
  const day = date.getDate();
  const hours = formatTwoDigits(date.getHours());

  switch (format) {
    case "dd. month":
      return `${day}. ${month}`;
    case "month 'year":
      return `${month} '${year}`;
    case "hours":
      return hours === "00" ? `${day}. ${month}` : `${hours}:00`;
    default:
      return `${hours}:00`;
  }
}

function extractTimestamps(data: TCoinHistoricalChartItem[]): number[] {
  return data.map((item) => item[0]);
}

function extractValues(data: TCoinHistoricalChartItem[]): number[] {
  return data.map((item) => item[1]);
}

function generateXAxisLabels(
  startTimestamp: number,
  endTimestamp: number,
  hourTimestamp: number,
  dayTimestamp: number
): string[] {
  const labels: string[] = [];
  let duration = Math.ceil((endTimestamp - startTimestamp) / DAY_TIMESTAMP);

  let interval = defineInterval(duration, hourTimestamp, dayTimestamp);
  let format = defineFormat(duration);

  const current = new Date(endTimestamp);

  while (current.getTime() >= startTimestamp && labels.length <= 11) {
    if (current.getHours() <= 2) {
      current.setHours(0);
      current.setMinutes(0);
      labels.push(formatLabel(current, format));
      current.setTime(current.getTime() - interval);
    } else {
      labels.push(formatLabel(current, format));
      current.setTime(current.getTime() - interval);
    }
  }

  return labels.reverse();
}

export function transformCoinHistoricalChartDataById(
  data: ICoinHistoricalChartDataById
): ITransformedCoinHistoricalChartDataById {
  const timestampsArr = extractTimestamps(data.prices);
  const xAsixLabels = generateXAxisLabels(
    timestampsArr[0],
    timestampsArr[timestampsArr.length - 1],
    HOUR_TIMESTAMP,
    DAY_TIMESTAMP
  );

  return { ...data, xAxisLabels: xAsixLabels };
}

export function transformCoinsListWithMarketData(
  data: ICoinsMarketData[]
): ITransformedCoinsMarketData[] {
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
      coin_percentage_table: [
        { label: "1h", value: price_change_percentage_1h_in_currency },
        {
          label: "24h",
          value: price_change_percentage_24h_in_currency,
        },
        { label: "7d", value: price_change_percentage_7d_in_currency },
        {
          label: "14d",
          value: price_change_percentage_14d_in_currency,
        },
        {
          label: "30d",
          value: price_change_percentage_30d_in_currency,
        },
        { label: "1y", value: price_change_percentage_1y_in_currency },
      ],
    })
  );
}
