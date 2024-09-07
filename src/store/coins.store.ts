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
      selectedCoin: {
        id: "",
        symbol: "",
        name: "",
        image: "",
        current_price: 0,
        current_price_formatted: "",
        market_cap: 0,
        market_cap_formatted: {
          label: "Market Cap",
          price: "",
        },
        market_cap_rank: 0,
        fully_diluted_valuation: {
          label: "Fully Diluted Valuation",
          price: "",
        },
        total_volume: 0,
        trading_volume_24h: {
          label: "24 Hour Trading Vol",
          price: "",
        },
        circulating_supply: {
          label: "Circulating Supply",
          price: "",
        },
        total_supply: {
          label: "Total Supply",
          price: "",
        },
        max_supply: {
          label: "Max Supply",
          price: "",
        },
        range_24h: {
          label: "24h Range",
          price: "",
        },
        range_7d: {
          label: "7d Range",
          price: "",
        },
        ath: {
          label: "All-Time High",
          price: "",
          percentage: 0,
          date: "ath_date",
        },
        atl: {
          label: "All-Time Low",
          price: "",
          percentage: 0,
          date: "ath_date",
        },
        sparkline_in_7d: {
          price: [0, 0],
        },
        price_change_percentage_1h_in_currency: 0,
        price_change_percentage_24h_in_currency: 0,
        price_change_percentage_7d_in_currency: 0,
        price_change_percentage_14d_in_currency: 0,
        price_change_percentage_30d_in_currency: 0,
        price_change_percentage_1y_in_currency: 0,
      },
      setSelectedCoin: (id) =>
        set((state) => {
          const selectedCoin = state.coins.find((coin) => coin.id === id) ?? state.selectedCoin;
          return { selectedCoin };
        }),
    }),
    { name: "CoinsStore" }
  )
);

export default useCoinsStore;
