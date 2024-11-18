import clsx from "clsx";
import { FaSearch } from "react-icons/fa";
import useSearch from "../../hooks/useSearch";
import SpinnerIcon from "../UI/SpinnerIcon";
import CoinBadgeList from "../coinBadgeList/CoinBadgeList";
import SearchClearButton from "../searchClearButton/SearchClearButton";

const Search = () => {
  const {
    loading,
    query,
    isFocusVisible,
    data,
    handleInputChange,
    clearQuery,
    showClearButton,
    showQueryList,
  } = useSearch();

  const inputClasses = clsx(
    "w-full px-2 py-2 pl-[34px] pr-[30px] rounded-md bg-primary-bg placeholder:text-secondary-text outline-none bg-search-bg",
    {
      "focus-visible-outline": isFocusVisible,
    }
  );

  const spinner = loading ? <SpinnerIcon width="w-5" height="h-5" /> : null;
  const clearBtn = showClearButton ? (
    <SearchClearButton clearQuery={clearQuery} />
  ) : null;
  const queryList = showQueryList ? <CoinBadgeList data={data} /> : null;

  return (
    <div>
      <div className="w-[300px] relative m-auto mb-6 border rounded-md border-select-border-color md:mb-7 shadow-md dark:shadow-lg">
        <FaSearch className="absolute left-2.5 top-1/2 translate-y-[-50%] text-border-color opacity-70" />
        <input
          className={inputClasses}
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search..."
        />
        <div className="absolute right-2 top-1/2 translate-y-[-50%]">
          {spinner}
        </div>
        {clearBtn}
      </div>
      {queryList}
    </div>
  );
};

export default Search;
