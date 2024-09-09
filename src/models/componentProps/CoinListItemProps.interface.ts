import { ILabeledValue } from "../dataTypes/LabeledValue.interface";
import { ILabeledValueExtended } from "../dataTypes/LabeledValueExtended.interface";

export interface ICoinListItemProps {
  value: ILabeledValue | ILabeledValueExtended;
}