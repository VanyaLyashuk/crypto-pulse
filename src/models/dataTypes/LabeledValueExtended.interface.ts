import { ILabeledValue } from "./LabeledValue.interface";

export interface ILabeledValueExtended extends ILabeledValue {
  percentage: number;
  date: string;
}