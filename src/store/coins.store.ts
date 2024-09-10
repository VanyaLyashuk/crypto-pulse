import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { ICoinsStore } from "../models";

const useCoinsStore = create<ICoinsStore>()(
  devtools(
    (set) => ({
      coins: [],
      setCoins: (coins) => set({ coins }),
      totalCoins: 0,
      setTotalCoins: (total) => set({ totalCoins: total })
    }),
    { name: "CoinsStore" }
  )
);

export default useCoinsStore;
