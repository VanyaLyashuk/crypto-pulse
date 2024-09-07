import { ILabeledValue } from "./LabeledValue.interface";
import { ILabeledValueExtended } from "./LabeledValueExtended.interface";

export interface IHistoricalPriceData {
  range_24h: ILabeledValue;
  range_7d: ILabeledValue;
  ath: ILabeledValueExtended;
  atl: ILabeledValueExtended;
}
