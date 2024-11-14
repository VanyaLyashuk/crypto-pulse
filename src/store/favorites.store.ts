import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { IFavoritesStore } from "../models";

const useFavoritesStore = create<IFavoritesStore>()(
  devtools(
    persist(
      (set) => ({
        favorites: [],
        toggleFavorites: (coinId: string) =>
          set((state) => {
            const updatedFavorites = state.favorites.includes(coinId)
              ? state.favorites.filter((id) => id !== coinId)
              : [...state.favorites, coinId];

            return { favorites: updatedFavorites };
          }),
        showFavorites: false,
        toggleShowFavorites: () =>
          set((state) => ({
            showFavorites: !state.showFavorites,
          })),
        hideFavorites: () => set({ showFavorites: false }),
      }),
      {
        name: "favorites",
        partialize: (state) => ({ favorites: state.favorites }),
      }
    ),
    { name: "FavoritesStore" }
  )
);

export default useFavoritesStore;
