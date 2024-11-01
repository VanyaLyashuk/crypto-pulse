import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { IFavoritesStore } from "../models";

const useFavoritesStore = create<IFavoritesStore>()(
  devtools(
    (set) => ({
      favorites: JSON.parse(localStorage.getItem("favorites") || "[]"),
      toggleFavorites: (coinId: string) =>
        set((state) => {
          const updatedFavorites = state.favorites.includes(coinId)
            ? state.favorites.filter((id) => id !== coinId)
            : [...state.favorites, coinId];
          localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
          return { favorites: updatedFavorites };
        }),
      showFavorites: false,
      toggleShowFavorites: () =>
        set((state) => ({
          showFavorites: !state.showFavorites,
        })),
      hideFavorites: () => set({ showFavorites: false }),
    }),
    { name: "FavoritesStore" }
  )
);

export default useFavoritesStore;
