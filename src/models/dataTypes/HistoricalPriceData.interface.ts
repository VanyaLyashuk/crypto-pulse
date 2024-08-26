import { ILabeledValue } from "./LabeledValue.interface";

export interface IHistoricalPriceData {
  "24h_range": ILabeledValue;
  "7d_range": ILabeledValue;
  "all_time_high": {
    label: string;
    price: string;
    price_change_percentage: number;
    date: string;
  }
  "all_time_low": {
    label: string;
    price: string;
    price_change_percentage: number;
    date: string;
  }
}