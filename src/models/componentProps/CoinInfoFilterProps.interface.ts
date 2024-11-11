import { TCoinInfoMetric } from "../dataTypes/CoinInfoMetric.type";
import { TCoinInfoTimeRange } from "../dataTypes/CoinInfoTimeRange.type";

export interface ICoinInfoFilterProps {
  filterOptions: TCoinInfoMetric[] | TCoinInfoTimeRange[];
  activeFilter: TCoinInfoMetric | TCoinInfoTimeRange;
}
