import debounce from "debounce";
import React from "react";
import { TCryptoTableCellContext, TCryptoTableCurrency } from "../models";

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
