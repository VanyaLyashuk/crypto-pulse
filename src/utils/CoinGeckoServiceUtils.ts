import {
  ICoinHistoricalChartDataById,
  ICoinsMarketData,
  ITransformedCoinHistoricalChartDataById,
  ITransformedCoinsMarketData,
} from "../models";
import {
  defineFormat,
  defineInterval,
  extractTimestamps,
  extractValues,
  formatCurrencyValue,
  formatDate,
  formatXAxisLabel,
  formatYAxisLabel,
  getMinMaxValue,
} from "./CryptoTableUtils";

const HOUR_TIMESTAMP = 3600 * 1000;
const DAY_TIMESTAMP = 24 * HOUR_TIMESTAMP;

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
      labels.push(formatXAxisLabel(current, format));
      current.setTime(current.getTime() - interval);
    } else {
      labels.push(formatXAxisLabel(current, format));
      current.setTime(current.getTime() - interval);
    }
  }

  return labels.reverse();
}

function generateYAxisLabels(prices: number[]): string[] {
  const { min: minValue, max: maxValue } = getMinMaxValue(prices);
  const range = maxValue - minValue;
  const roughStep = range / 5;
  const stepMagnitude = Math.pow(10, Math.floor(Math.log10(roughStep)));
  const normalizedStep = roughStep / stepMagnitude;
  let step;

  if (normalizedStep < 1.5) {
    step = 1 * stepMagnitude;
  } else if (normalizedStep < 3) {
    step = 2 * stepMagnitude;
  } else if (normalizedStep < 7.5) {
    step = 5 * stepMagnitude;
  } else {
    step = 10 * stepMagnitude;
  }

  const start = Math.floor(minValue / step) * step;
  const labels: string[] = [];
  let value = start;

  while (value <= maxValue) {
    let currentValue = +value.toFixed(
      step < 1 ? Math.max(0, Math.abs(Math.floor(Math.log10(step)))) : 0
    );
    labels.push(formatYAxisLabel(currentValue));
    value += step;
  }

  let nextValue = +value.toFixed(
    step < 1 ? Math.max(0, Math.abs(Math.floor(Math.log10(step)))) : 0
  );
  labels.push(formatYAxisLabel(nextValue));

  return Array.from(new Set(labels));
}

export function transformCoinHistoricalChartDataById(
  data: ICoinHistoricalChartDataById
): ITransformedCoinHistoricalChartDataById {
  const timestampsPrice = extractTimestamps(data.prices);
  const pricesArr = extractValues(data.prices);
  const marketCapArr = extractValues(data.market_caps);

  const xAxisLabels = generateXAxisLabels(
    timestampsPrice[0],
    timestampsPrice[timestampsPrice.length - 1],
    HOUR_TIMESTAMP,
    DAY_TIMESTAMP
  );
  const yAxisLabelsPrice = generateYAxisLabels(pricesArr);
  const yAxisLabelsMarketCap = generateYAxisLabels(marketCapArr);

  return {
    ...data,
    xAxisLabels,
    yAxisLabelsPrice,
    yAxisLabelsMarketCap,
  };
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
          price: [low_24h, high_24h],
        },
        range_7d: {
          label: "7d Range",
          price: [
            getMinMaxValue(sparkline_in_7d.price).min,
            getMinMaxValue(sparkline_in_7d.price).max,
          ],
        },
        ath: {
          label: "All-Time High",
          price: ath,
          percentage: ath_change_percentage,
          date: formatDate(ath_date),
        },
        atl: {
          label: "All-Time Low",
          price: atl,
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

export const convertScientificToStandard = (x: number): string => {
  if (Math.abs(x) < 1.0) {
    const e = parseInt(x.toString().split("e-")[1]);
    if (e) {
      x *= Math.pow(10, e - 1);
      return "0." + new Array(e).join("0") + x.toString().substring(2);
    }
  } else {
    const e = parseInt(x.toString().split("+")[1]);
    if (e > 20) {
      const adjustedE = e - 20;
      x /= Math.pow(10, adjustedE);
      return x.toString() + new Array(adjustedE + 1).join("0");
    }
  }
  return x.toString();
};
