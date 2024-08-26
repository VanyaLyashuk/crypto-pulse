import { ICoinStatisticsData } from "../dataTypes/CoinStatisticsData.interface";
import { IHistoricalPriceData } from "../dataTypes/HistoricalPriceData.interface";

export interface ICoinInfoListProps {
  name: string;
  title: "Statistics" | "Historical Price";
  data: ICoinStatisticsData | IHistoricalPriceData;
}
