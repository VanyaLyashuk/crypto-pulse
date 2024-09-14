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
    }),
    { name: "CoinInfoStore" }
  )
);

export default useCoinInfoStore;
