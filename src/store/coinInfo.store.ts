import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { ICoinInfoStore } from "../models/index.ts";
import { calcStartDate } from "../utils/CryptoTableUtils.ts";

// const defaultEndDate = new Date();
const defaultPeriod = "24h";

const useCoinInfoStore = create<ICoinInfoStore>()(
  devtools(
    (set) => ({
      selectedMetric: "Price",
      setSelectedMetric: (value) => set({ selectedMetric: value }),
      selectedTimeRange: defaultPeriod,
      setSelectedTimeRange: (value) => set({ selectedTimeRange: value }),
      isDatepickerOpen: false,
      setIsDatepickerOpen: (value) => set({ isDatepickerOpen: value }),
      startDate: calcStartDate(defaultPeriod),
      setStartDate: (date) => set({ startDate: date }),
      endDate: undefined,
      setEndDate: (date) => set({ endDate: date }),
    }),
    { name: "CoinInfoStore" }
  )
);

export default useCoinInfoStore;
