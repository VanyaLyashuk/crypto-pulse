import { TCoinInfoMetric } from "../dataTypes/CoinInfoMetric.type";
import { TCoinInfoTimeRange } from "../dataTypes/CoinInfoTimeRange.type";
import { TDateChangeHandler } from "../dataTypes/DateChangeHandler.type";

export interface ICoinInfoFilterProps {
  filterOptions: TCoinInfoMetric[] | TCoinInfoTimeRange[];
  activeFilter: string;
  startDate?: Date | null;
  endDate?: Date | null;
  handleDateChange?: TDateChangeHandler;
}
