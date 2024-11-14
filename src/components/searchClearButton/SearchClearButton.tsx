import { FC } from "react";
import { MdClear } from "react-icons/md";
import { ISearchClearButton } from "../../models";

const SearchClearButton: FC<ISearchClearButton> = ({ clearQuery }) => {
  return (
    <button
      onClick={clearQuery}
      className="absolute p-1 top-1/2 translate-y-[-50%] right-[2px] text-red-400 focus-visible-outline"
    >
      <MdClear className="w-5 h-5" />
    </button>
  );
};

export default SearchClearButton;
