import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { ICoinsState } from "../models";

const useCoinsStore = create<ICoinsState>()(
  devtools(
    (set) => ({
      coins: [],
      setCoins: (coins) => set({ coins }),
    }),
    { name: 'CoinsStore' }
  )
);

export default useCoinsStore;