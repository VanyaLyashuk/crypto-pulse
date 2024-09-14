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
      onFilterChange: (filter) => {
        const isMetric = filter === "Price" || filter === "Market Cap";
        const isDateRange = filter === "date range";

        if (isMetric) {
          set({ selectedMetric: filter });
        } else {
          set({ selectedTimeRange: filter });
        }
        set({ isDatepickerOpen: isDateRange });
      },
    }),
    { name: "CoinInfoStore" }
  )
);

export default useCoinInfoStore;
