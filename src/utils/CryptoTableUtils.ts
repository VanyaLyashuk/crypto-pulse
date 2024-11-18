import { Cell } from "@tanstack/react-table";
import clsx from "clsx";
import useFormattedSmallCurrency from "../hooks/useFormattedSmallCurrency";
import {
  ITransformedCoinsMarketData,
  TCoinHistoricalChartItem,
  TCoinInfoTimeRange,
  TCryptoTableCellContext,
  TCryptoTableCurrency,
  TDateOrUndefined,
  TShortMonthName,
} from "../models";

export const CHART_COLORS = {
  darkGrid: "rgba(55, 65, 81, 1)",
  lightGrid: "rgb(229, 231, 235)",
  darkLine: "rgba(55, 65, 81, 1)",
  lightLine: "rgb(229, 231, 235)",
  red: "rgba(220, 38, 38, 1)",
  green: "rgba(34, 197, 94, 1)",
  label: "rgb(107, 114, 128)",
};

export const getUnixTimestamp = (date: TDateOrUndefined): number =>
  date ? Math.floor(date.getTime() / 1000) : 0;

export function getMinMaxValue(arr: number[]): { min: number; max: number } {
  return {
    min: Math.min(...arr),
    max: Math.max(...arr),
  };
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

export function extractValues(data: TCoinHistoricalChartItem[]): number[] {
  return data.map((item) => item[1]);
}

export function calcStartDate(period: TCoinInfoTimeRange, date?: Date): Date {
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

export function formatCurrencyValue(
  value: number | null | undefined,
  currency?: TCryptoTableCurrency,
  options?: Intl.NumberFormatOptions
): string {
  if (value !== null && value !== undefined) {
    if (currency && options) {
      return currency + value.toLocaleString("en-US", options);
    } else if (currency) {
      return currency + value.toLocaleString("en-US");
    } else {
      return value.toLocaleString("en-US");
    }
  }
  return "-";
}

export function formatPercentageValue(value: number): string {
  return value ? `${Math.abs(value).toFixed(1)}%` : "-";
}

export function formatDate(
  date: string | number,
  includeTime: boolean = false
): string {
  const dateObj = new Date(date);
  const month = getShortMonthName(dateObj.getMonth());
  const day = formatTwoDigits(dateObj.getDate());
  const year = dateObj.getFullYear();

  let formattedDate = `${month} ${day}, ${year}`;

  if (includeTime) {
    const hours = formatTwoDigits(dateObj.getHours());
    const minutes = formatTwoDigits(dateObj.getMinutes());
    const seconds = formatTwoDigits(dateObj.getSeconds());

    const timezoneOffset = -dateObj.getTimezoneOffset() / 60;
    const offsetSign = timezoneOffset >= 0 ? "+" : "-";
    const formattedOffset = `GMT${offsetSign}${Math.abs(timezoneOffset)}`;

    formattedDate += `, ${hours}:${minutes}:${seconds} ${formattedOffset}`;
  }

  return formattedDate;
}

export function formatTwoDigits(value: number): string {
  return value.toString().padStart(2, "0");
}

export function formatYAxisLabel(value: number, currency: string = "$") {
  let formattedValue: string;

  if (value >= 1e12) {
    formattedValue =
      new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(value / 1e12) + "T";
  } else if (value >= 1e9) {
    formattedValue =
      new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(value / 1e9) + "B";
  } else if (value >= 1e6) {
    formattedValue =
      new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(value / 1e6) + "M";
  } else if (value >= 1e3) {
    formattedValue =
      new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(value / 1e3) + "K";
  } else if (value < 1 && value >= 0.001) {
    formattedValue = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 3,
    }).format(value);
  } else if (value < 0.0001) {
    formattedValue = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 7,
    }).format(value);
  } else {
    formattedValue = new Intl.NumberFormat("en-US").format(value);
  }

  return currency + formattedValue;
}

export const renderCurrencyCell =
  (currency: TCryptoTableCurrency, options?: Intl.NumberFormatOptions) =>
  (info: TCryptoTableCellContext) => {
    const value = info.getValue<number>();

    if (value === null) {
      return "-";
    }

    if (value < 1) {
      const fractionalPart = value.toString().split(".")[1] || "";
      const leadingZeros = fractionalPart.match(/^0+/)?.[0].length || 0;

      if (leadingZeros >= 4) {
        return useFormattedSmallCurrency(value, currency, options);
      }
    }

    return formatCurrencyValue(value, currency, options);
  };

export const getCellClasses = (
  cell: Cell<ITransformedCoinsMarketData, unknown>,
  index: number
) => {
  return clsx(
    "px-2 py-1 text-base bg-primary-bg hover-hover:group-hover:bg-search-bg",
    {
      "w-8 pl-4": cell.column.id === "favorite",
      "table-sticky-cell": cell.column.id === "name",
      "text-right": index > 2,
      "pr-4": cell.column.id === "sparkline_in_7d",
    }
  );
};
