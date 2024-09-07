import { ILabeledValue } from "./LabeledValue.interface";

export interface ICoinStatisticsData {
  market_cap_formatted: ILabeledValue;
  fully_diluted_valuation: ILabeledValue;
  trading_volume_24h: ILabeledValue;
  circulating_supply: ILabeledValue;
  total_supply: ILabeledValue;
  max_supply: ILabeledValue;
}