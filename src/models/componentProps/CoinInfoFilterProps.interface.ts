import { TCoinInfoMetric } from "../dataTypes/CoinInfoMetric.type";
import { TCoinInfoTimeRange } from "../dataTypes/CoinInfoTimeRange.type";
import { TDateChangeHandler } from "../dataTypes/DateChangeHandler.type";

export interface ICoinInfoFilterProps {
  filterOptions: TCoinInfoMetric[] | TCoinInfoTimeRange[];
  activeFilter: string;
  onFilterChange: (filter: TCoinInfoMetric | TCoinInfoTimeRange) => void;
  startDate?: Date | null;
  endDate?: Date | null;
  isOpen?: boolean;
  handleDateChange?: TDateChangeHandler;
  toggleDatepicker?: () => void;
}
