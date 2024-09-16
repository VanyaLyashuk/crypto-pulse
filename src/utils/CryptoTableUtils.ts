import debounce from "debounce";
import React from "react";
import {
  TCoinInfoTimeRange,
  TCryptoTableCellContext,
  TCryptoTableCurrency,
  TDateOrUndefined,
  TShortMonthName,
} from "../models";

export const handlePageChange = debounce(
  (
    count: number,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  ): void => {
    setCurrentPage(count);
  },
  300
);

export const renderCurrencyCell =
  (currency: TCryptoTableCurrency, options?: Intl.NumberFormatOptions) =>
  (info: TCryptoTableCellContext) => {
    const value = info.getValue<number>();
    return formatCurrencyValue(value, currency, options);
  };

export function formatCurrencyValue(
  value: number,
  currency?: TCryptoTableCurrency,
  options?: Intl.NumberFormatOptions
): string {
  if (value && options && currency) {
    return currency + value.toLocaleString("en-US", options);
  } else if (value && currency) {
    return currency + value.toLocaleString("en-US");
  } else if (value) {
    return value.toLocaleString("en-US");
  }
  return "-";
}

export function formatPercentageValue(value: number): string {
  return value ? `${Math.abs(value).toFixed(1)}%` : "-";
}

export function getMinMaxValue(arr: number[]): { min: number; max: number } {
  return {
    min: Math.min(...arr),
    max: Math.max(...arr),
  };
}

export function formatDate(date: string): string {
  const dateObj = new Date(date);
  const month = getShortMonthName(dateObj.getMonth());
  const day = formatTwoDigits(dateObj.getDate());
  const year = dateObj.getFullYear();

  return `${month} ${day}, ${year}`;
}

export function getShortMonthName(month: number): TShortMonthName {
  const months: TShortMonthName[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  if (month < 0 || month > 11) {
    throw new Error("Invalid month index");
  }
  return months[month];
}

export function formatTwoDigits(value: number): string {
  return value.toString().padStart(2, "0");
}

export function calcStartDate(startDate: Date, period: TCoinInfoTimeRange): Date {
  const endDate = startDate ? new Date(startDate) : new Date();

  switch (period) {
    case "7d":
      endDate.setDate(endDate.getDate() - 7);
      return endDate;
    case "1m":
      endDate.setMonth(endDate.getMonth() - 1);
      return endDate;
    case "3m":
      endDate.setMonth(endDate.getMonth() - 3);
      return endDate;
    case "1y":
      endDate.setFullYear(endDate.getFullYear() - 1);
      return endDate;
    default:
      endDate.setHours(endDate.getHours() - 24);
      return endDate;
  }
}
export const getUnixTimestamp = (date: TDateOrUndefined): number =>
  date ? Math.floor(date.getTime() / 1000) : 0;
