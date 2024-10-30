export interface IFavoritesStore {
  favorites: string[];
  toggleFavorites: (coinId: string) => void;
  showFavorites: boolean;
  toggleShowFavorites: () => void;
}