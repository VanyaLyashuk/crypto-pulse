import { TButtonClickHandler } from "./ButtonClickHandler.type";

export interface IFavoritesButtonViewProps {
  handleClick: TButtonClickHandler;
  isFilled: boolean;
  disabled?: boolean;
}