import { clsx } from "clsx";
import { useEffect, useState } from "react";
import { GoStar, GoStarFill } from "react-icons/go";
import {
  IFavoritesButtonProps,
  IFavoritesButtonViewProps,
  TButtonClickHandler,
} from "../../models";
import useFavoritesStore from "../../store/favorites.store";

const FavoritesButton: React.FC<IFavoritesButtonProps> = ({
  coinId,
  isHeader,
}) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const { favorites, toggleFavorites, showFavorites, toggleShowFavorites } =
    useFavoritesStore();

  useEffect(() => {
    if (coinId) {
      setIsFavorite(favorites.includes(coinId));
    }
  }, [favorites, coinId]);

  const onToggleFavorites: TButtonClickHandler = (event) => {
    event.stopPropagation();

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

  const button = isHeader ? (
    <ButtonView
      handleClick={(event) => handleFavorites(event)}
      isFilled={showFavorites}
      disabled={!favorites.length}
    />
  ) : (
    <ButtonView
      handleClick={(event) => onToggleFavorites(event)}
      isFilled={isFavorite}
    />
  );

  return button;
};

const ButtonView: React.FC<IFavoritesButtonViewProps> = ({
  handleClick,
  isFilled,
  disabled,
}) => {
  const buttonClasses = clsx("block mx-auto focus-visible-outline", {
    "text-gray-300 dark:text-gray-700": disabled,
  });

  return (
    <button onClick={handleClick} className={buttonClasses} disabled={disabled}>
      {isFilled ? <GoStarFill className="fill-primary-logo" /> : <GoStar />}
    </button>
  );
};

export default FavoritesButton;
