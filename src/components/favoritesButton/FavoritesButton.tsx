import { clsx } from "clsx";
import { GoStar, GoStarFill } from "react-icons/go";
import { useShallow } from "zustand/react/shallow";
import useFavoritesButton from "../../hooks/useFavoritesButton";
import { IFavoritesButtonProps, IFavoritesButtonViewProps } from "../../models";
import useFavoritesStore from "../../store/favorites.store";

const FavoritesButton: React.FC<IFavoritesButtonProps> = ({
  coinId,
  isShowFavorites,
}) => {
  const { isFavorite, onToggleFavorites, handleFavorites } =
    useFavoritesButton(coinId);

  const { favorites, showFavorites } = useFavoritesStore(
    useShallow((state) => ({
      favorites: state.favorites,
      showFavorites: state.showFavorites,
    }))
  );

  const isShowFavoritesFilled = showFavorites && !!favorites.length;
  const isShowFavoritesDisabled = !favorites.length;

  return isShowFavorites ? (
    <ButtonView
      handleClick={(e) => handleFavorites(e)}
      isFilled={isShowFavoritesFilled}
      disabled={isShowFavoritesDisabled}
    />
  ) : (
    <ButtonView
      handleClick={(e) => onToggleFavorites(e)}
      isFilled={isFavorite}
    />
  );
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
      {isFilled ? <GoStarFill className="fill-yellow-400" /> : <GoStar />}
    </button>
  );
};

export default FavoritesButton;
