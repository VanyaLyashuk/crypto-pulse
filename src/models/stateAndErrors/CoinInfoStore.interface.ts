import { TCoinInfoMetric } from "../dataTypes/CoinInfoMetric.type";
import { TCoinInfoTimeRange } from "../dataTypes/CoinInfoTimeRange.type";
import { TDateOrUndefined } from "../dataTypes/DateOrUndefined.type";

export interface ICoinInfoStore {
  selectedCoinId: string;
  setSelectedCoinId: (id: string) => void;
  selectedMetric: TCoinInfoMetric;
  setSelectedMetric: (value: TCoinInfoMetric) => void;
  selectedTimeRange: TCoinInfoTimeRange;
  setSelectedTimeRange: (value: TCoinInfoTimeRange) => void;
  isDatepickerOpen: boolean;
  setIsDatepickerOpen: (value: boolean) => void;
  startDate: TDateOrUndefined;
  setStartDate: (date: TDateOrUndefined) => void;
  endDate: TDateOrUndefined;
  setEndDate: (date: TDateOrUndefined) => void;
}