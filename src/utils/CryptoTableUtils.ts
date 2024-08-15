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

function formatCurrencyValue(
  value: number,
  currency: TCryptoTableCurrency,
  options?: Intl.NumberFormatOptions
): string {
  if (options && value) {
    return currency + value.toLocaleString("en-US", options);
  } else if (value) {
    return currency + value.toLocaleString("en-US");
  }
  return "-";
}

export function formatPercentageValue(value: number): string {
  return value ? `${Math.abs(value).toFixed(1)}%` : "-";
}
