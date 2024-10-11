import { TCoinHistoricalChartItem } from "./CoinHistoricalChartItem.type";

export interface ITransformedCoinHistoricalChartDataById {
  prices: TCoinHistoricalChartItem[],
  market_caps: TCoinHistoricalChartItem[],
  total_volumes: TCoinHistoricalChartItem[],
  xAxisLabelsPrice: string[],
  xAxisLabelsMarketCap: string[],
  yAxisLabelsPrice: string[],
  yAxisLabelsMarketCap: string[],
}