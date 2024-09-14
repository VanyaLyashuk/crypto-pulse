import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { ICoinInfoStore } from "../models/index.ts";

const useCoinInfoStore = create<ICoinInfoStore>()(
  devtools(
    (set) => ({
      selectedCoinId: "",
      setSelectedCoinId: (id) => set({ selectedCoinId: id }),
      selectedMetric: "Price",
      setSelectedMetric: (value) => set({ selectedMetric: value }),
      selectedTimeRange: "24h",
      setSelectedTimeRange: (value) => set({ selectedTimeRange: value }),
      isDatepickerOpen: false,
      setIsDatepickerOpen: (value) => set({ isDatepickerOpen: value }),
      startDate: null,
      setStartDate: (date) => set({startDate: date}),
      endDate: null,
      setEndDate: (date) => set({endDate: date}),
    }),
    { name: "CoinInfoStore" }
  )
);

export default useCoinInfoStore;
