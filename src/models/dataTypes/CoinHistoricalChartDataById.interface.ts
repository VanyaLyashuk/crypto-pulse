import { TCoinHistoricalChartItem } from "./CoinHistoricalChartItem.type";

export interface ICoinHistoricalChartDataById {
  prices: TCoinHistoricalChartItem[],
  market_caps: TCoinHistoricalChartItem[],
  total_volumes: TCoinHistoricalChartItem[],
}