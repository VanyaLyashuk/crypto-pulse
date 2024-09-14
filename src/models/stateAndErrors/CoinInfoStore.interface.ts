import { TCoinInfoMetric } from "../dataTypes/CoinInfoMetric.type";
import { TCoinInfoTimeRange } from "../dataTypes/CoinInfoTimeRange.type";

export interface ICoinInfoStore {
  selectedCoinId: string;
  setSelectedCoinId: (id: string) => void;
  selectedMetric: TCoinInfoMetric;
  setSelectedMetric: (value: TCoinInfoMetric) => void;
  selectedTimeRange: TCoinInfoTimeRange;
  setSelectedTimeRange: (value: TCoinInfoTimeRange) => void;
  isDatepickerOpen: boolean;
  setIsDatepickerOpen: (value: boolean) => void;
}