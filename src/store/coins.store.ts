import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { ICoinsStore } from "../models";

const useCoinsStore = create<ICoinsStore>()(
  devtools(
    (set) => ({
      coins: [],
      setCoins: (coins) => set({ coins }),
      totalCoins: 0,
      setTotalCoins: (total) => set({ totalCoins: total }),
      removeCoin: (coinId) =>
        set((state) => {
          const updatedCoins = state.coins.filter((coin) => coin.id !== coinId);
          return { coins: updatedCoins };
        }),
    }),
    { name: "CoinsStore" }
  )
);

export default useCoinsStore;
