import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { ICoinInfoStore } from "../models/index.ts";

const useCoinInfoStore = create<ICoinInfoStore>()(
  devtools(
    (set) => ({
      selectedCoinId: "",
      setSelectedCoinId: (id) => set({ selectedCoinId: id }),
    }),
    { name: "CoinInfoStore" }
  )
);

export default useCoinInfoStore;
