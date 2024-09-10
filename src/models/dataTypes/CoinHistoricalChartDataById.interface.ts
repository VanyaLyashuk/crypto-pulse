type TCoinHistoricalChartItem  = [number, number];

export interface ICoinHistoricalChartDataById {
  prices: TCoinHistoricalChartItem[],
  market_caps: TCoinHistoricalChartItem[],
  total_volumes: TCoinHistoricalChartItem[],
}