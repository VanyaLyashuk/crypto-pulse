import { TCoinInfoMetric } from "../dataTypes/CoinInfoMetric.type";
import { TCoinInfoTimeRange } from "../dataTypes/CoinInfoTimeRange.type";
import { TDateOrUndefined } from "../dataTypes/DateOrUndefined.type";

export interface ICoinInfoStore {
  selectedMetric: TCoinInfoMetric;
  setSelectedMetric: (value: TCoinInfoMetric) => void;
  selectedTimeRange: TCoinInfoTimeRange;
  setSelectedTimeRange: (value: TCoinInfoTimeRange) => void;
  isDatepickerOpen: boolean;
  setIsDatepickerOpen: (value: boolean) => void;
  startDate: Date;
  setStartDate: (date: Date) => void;
  endDate: TDateOrUndefined;
  setEndDate: (date: Date) => void;
}
