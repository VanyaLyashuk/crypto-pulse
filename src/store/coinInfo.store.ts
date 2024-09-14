import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { ICoinInfoStore } from "../models/index.ts";

const useCoinInfoStore = create<ICoinInfoStore>()(
  devtools(
    (set) => ({
      selectedCoinId: "",
      setSelectedCoinId: (id) => set({ selectedCoinId: id }),
      selectedMetric: "Price",
      setSelectedMetric: (value) => set({selectedMetric: value}),
    }),
    { name: "CoinInfoStore" }
  )
);

export default useCoinInfoStore;
