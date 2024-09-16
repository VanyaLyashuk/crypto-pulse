import { ICoinHistoricalChartDataById } from "./CoinHistoricalChartDataById.interface";
import { TCoinInfoTimeRange } from "./CoinInfoTimeRange.type";

export type TCoinInfoChartData = {
  [key in TCoinInfoTimeRange]?: ICoinHistoricalChartDataById;
};
