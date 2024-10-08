import debounce from "debounce";
import React from "react";
import {
  TChartDateFormat,
  TCoinHistoricalChartItem,
  TCoinInfoTimeRange,
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

export function extractTimestamps(data: TCoinHistoricalChartItem[]): number[] {
  return data.map((item) => item[0]);
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

export function formatDate(date: string | number, includeTime: boolean = false): string {
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
    const offsetSign = timezoneOffset >= 0 ? '+' : '-';
    const formattedOffset = `GMT${offsetSign}${Math.abs(timezoneOffset)}`;

    formattedDate += `, ${hours}:${minutes}:${seconds} ${formattedOffset}`;
  }

  return formattedDate;
}

export function formatTwoDigits(value: number): string {
  return value.toString().padStart(2, "0");
}

export function formatXAxisLabel(date: Date, format: TChartDateFormat) {
  const year = date.getFullYear().toString().slice(-2);
  const month = getShortMonthName(date.getMonth());
  const day = date.getDate();
  const hours = formatTwoDigits(date.getHours());

  switch (format) {
    case "dd. month":
      return `${day}. ${month}`;
    case "month 'year":
      return `${month} '${year}`;
    case "hours":
      return hours === "00" ? `${day}. ${month}` : `${hours}:00`;
    default:
      return `${hours}:00`;
  }
}

export function formatYAxisLabel(value: number, currency: string = '$') {
  if (value >= 1e6) {
    return currency + (value % 1e6 === 0 ? (value / 1e6).toFixed(0) : (value / 1e6).toFixed(2)) + 'M';
  } else if (value >= 1e3) {
    return currency + (value % 1e3 === 0 ? (value / 1e3).toFixed(0) : (value / 1e3).toFixed(2)) + 'K';
  } else if (value >= 1) {
    return currency + (Number.isInteger(value) ? value.toFixed(0) : value.toFixed(2));
  } else {
    return currency + value.toString();
  }
}

export function defineInterval(
  duration: number,
  hourTimestamp: number,
  dayTimestamp: number
): number {
  if (duration >= 2 && duration <= 4) {
    return 6 * hourTimestamp;
  } else if (duration >= 5 && duration <= 9) {
    return dayTimestamp;
  } else if (duration >= 10 && duration <= 20) {
    return 2 * dayTimestamp;
  } else if (duration >= 20 && duration <= 29) {
    return 3 * dayTimestamp;
  } else if (duration >= 30 && duration <= 40) {
    return 4 * dayTimestamp;
  } else if (duration >= 41 && duration <= 130) {
    return 10 * dayTimestamp;
  } else if (duration >= 131) {
    return 30 * dayTimestamp;
  } else {
    return 3 * hourTimestamp;
  }
}
export function defineFormat(duration: number): TChartDateFormat {
  if (duration >= 5 && duration <= 130) {
    return "dd. month";
  } else if (duration >= 131) {
    return "month 'year";
  } else {
    return "hours";
  }
}
