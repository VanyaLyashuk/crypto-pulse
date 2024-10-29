import { useState } from "react";
import { GoStar, GoStarFill } from "react-icons/go";

const FavoritesButton = () => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  return (
    <button onClick={() => setIsFavorite(!isFavorite)}>
      {isFavorite ? <GoStarFill /> : <GoStar />}
    </button>
  );
};

export default FavoritesButton;
