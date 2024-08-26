import { TDateChangeHandler } from "../dataTypes/DateChangeHandler.type";

export interface ICoinInfoDatePickerProps {
  startDate?: Date | null;
  endDate?: Date | null;
  handleDateChange?: TDateChangeHandler;
}