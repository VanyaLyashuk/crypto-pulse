import { TCoinInfoMetric } from "../dataTypes/CoinInfoMetric.type";

export interface ICoinInfoStore {
  selectedCoinId: string;
  setSelectedCoinId: (id: string) => void;
  selectedMetric: TCoinInfoMetric;
  setSelectedMetric: (value: TCoinInfoMetric) => void;
}