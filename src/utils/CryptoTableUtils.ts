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

export function calcStartDate(period: TCoinInfoTimeRange, date?: Date,): Date {
  const startDate = date ? new Date(date) : new Date();

  switch (period) {
    case "7d":
      startDate.setDate(startDate.getDate() - 7);
      return startDate;
    case "1m":
      startDate.setMonth(startDate.getMonth() - 1);
      return startDate;
    case "3m":
      startDate.setMonth(startDate.getMonth() - 3);
      return startDate;
    case "1y":
      startDate.setFullYear(startDate.getFullYear() - 1);
      return startDate;
    default:
      startDate.setHours(startDate.getHours() - 24);
      return startDate;
  }
}

export const getUnixTimestamp = (date: TDateOrUndefined): number =>
  date ? Math.floor(date.getTime() / 1000) : 0;
