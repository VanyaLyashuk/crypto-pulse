import { ILabeledValue } from "./LabeledValue.interface";

export interface ICoinStatisticsData {
  market_cap: ILabeledValue;
  fully_diluted_valuation: ILabeledValue;
  "24h_trading_volume": ILabeledValue;
  circulating_supply: ILabeledValue;
  total_supply: ILabeledValue;
  max_supply: ILabeledValue;
}