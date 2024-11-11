import { TCoinInfoMetric } from "../dataTypes/CoinInfoMetric.type";
import { TCoinInfoTimeRange } from "../dataTypes/CoinInfoTimeRange.type";

export interface ICoinInfoFilterButtonProps {
  filter: TCoinInfoTimeRange | TCoinInfoMetric;
  activeFilter: TCoinInfoTimeRange | TCoinInfoMetric,
}