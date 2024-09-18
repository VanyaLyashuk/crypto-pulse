import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { ICoinInfoStore } from "../models/index.ts";
import { calcStartDate } from "../utils/CryptoTableUtils.ts";

const defaultEndDate = new Date();
const defaultPeriod = "24h";

const useCoinInfoStore = create<ICoinInfoStore>()(
  devtools(
    (set) => ({
      selectedCoinId: "",
      setSelectedCoinId: (id) => set({ selectedCoinId: id }),
      selectedMetric: "Price",
      setSelectedMetric: (value) => set({ selectedMetric: value }),
      selectedTimeRange: defaultPeriod,
      setSelectedTimeRange: (value) => set({ selectedTimeRange: value }),
      isDatepickerOpen: false,
      setIsDatepickerOpen: (value) => set({ isDatepickerOpen: value }),
      startDate: calcStartDate(defaultPeriod, defaultEndDate),
      setStartDate: (date) => set({ startDate: date }),
      endDate: defaultEndDate,
      setEndDate: (date) => set({ endDate: date }),
    }),
    { name: "CoinInfoStore" }
  )
);

export default useCoinInfoStore;
