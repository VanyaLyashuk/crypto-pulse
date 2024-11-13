import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { TButtonClickHandler } from "../models";
import useCoinsStore from "../store/coins.store";
import useFavoritesStore from "../store/favorites.store";

const useFavoritesButton = (coinId: string | undefined) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const { favorites, toggleFavorites, showFavorites, toggleShowFavorites } =
    useFavoritesStore(
      useShallow((state) => ({
        favorites: state.favorites,
        toggleFavorites: state.toggleFavorites,
        showFavorites: state.showFavorites,
        toggleShowFavorites: state.toggleShowFavorites,
      }))
    );

  const { removeCoin } = useCoinsStore(
    useShallow((state) => ({
      removeCoin: state.removeCoin,
    }))
  );

  useEffect(() => {
    if (coinId) {
      setIsFavorite(favorites.includes(coinId));
    }
  }, [coinId, favorites]);

  const onToggleFavorites: TButtonClickHandler = (event) => {
    event.stopPropagation();

    if (coinId && showFavorites) {
      removeCoin(coinId);
    }

    if (coinId) {
      toggleFavorites(coinId);
    }

    setIsFavorite(!isFavorite);
  };

  const handleFavorites: TButtonClickHandler = (event) => {
    event.stopPropagation();

    setIsFavorite(!isFavorite);
    toggleShowFavorites();
  };
  return { isFavorite, onToggleFavorites, handleFavorites };
};

export default useFavoritesButton;
