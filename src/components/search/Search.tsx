import clsx from "clsx";
import debounce from "debounce";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdClear } from "react-icons/md";
import { fadeInUpAnimation } from "../../animations/animationsVariants";
import useCoinInfoModal from "../../hooks/useCoinInfoModal";
import { ISearchCoinResult } from "../../models";
import useCoinGeckoService from "../../services/CoinGeckoService";
import SpinnerIcon from "../UI/SpinnerIcon";

const Search = () => {
  const [query, setQuery] = useState<string>("");
  const [isFocusVisible, setIsFocusVisible] = useState<boolean>(false);
  const [data, setData] = useState<ISearchCoinResult[]>([]);

  const { loading, error, searchCoin } = useCoinGeckoService();
  const { openModal } = useCoinInfoModal();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();

    setQuery(value);

    if (!value.length) {
      clearQuery();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Tab" || e.key.includes("Arrow")) {
      setIsFocusVisible(true);
    }
  };

  const handleMouseDowm = () => {
    setIsFocusVisible(false);
  };

  const clearQuery = () => {
    setQuery("");
    setData([]);
  };

  const onRequest = (query: string) => {
    searchCoin(query).then((res) => {
      setData(res);
    });
  };

  const debouncedSearch = debounce(onRequest, 500);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleMouseDowm);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleMouseDowm);
    };
  }, []);

  useEffect(() => {
    if (query) {
      debouncedSearch(query);
    }
    return debouncedSearch.clear;
  }, [query]);

  const queryList =
    !loading && !error && data.length ? (
      <ul className="flex flex-wrap justify-center w-full gap-2 p-2 overflow-y-scroll rounded-md">
        {data.map(({ id, name, thumb, symbol }, index) => (
          <motion.li
            initial="hidden"
            whileInView="visible"
            variants={fadeInUpAnimation(index * 0.1)}
            viewport={{ once: true }}
            key={id}
            className="flex items-center p-2 text-sm rounded-lg cursor-pointer gap-x-1 focus-visible-outline bg-filter-bg"
            onClick={() => openModal(id)}
            tabIndex={0}
          >
            <img className="w-6 h-6 shrink-0" src={thumb} alt={name} />
            <h4>{name}</h4>
            <span className="text-secondary-text">{symbol}</span>
          </motion.li>
        ))}
      </ul>
    ) : null;

  const spinner = loading ? (
    <div className="absolute right-2 top-1/2 translate-y-[-50%]">
      <SpinnerIcon width="w-5" height="h-5" />
    </div>
  ) : null;

  const clearBtn =
    !loading && !error && query ? (
      <button
        onClick={clearQuery}
        className="absolute p-1 top-1/2 translate-y-[-50%] right-[2px] text-red-400 focus-visible-outline"
      >
        <MdClear className="w-5 h-5" />
      </button>
    ) : null;

  const inputClasses = clsx(
    "w-full px-2 py-2 pl-[34px] pr-[30px] rounded-md bg-primary-bg placeholder:text-secondary-text outline-none bg-search-bg",
    {
      "focus-visible-outline": isFocusVisible,
    }
  );

  return (
    <div>
      <div className="w-[300px] relative m-auto mb-1 border rounded-md border-select-border-color md:mb-3">
        <FaSearch className="absolute left-2.5 top-1/2 translate-y-[-50%] text-border-color opacity-70" />
        <input
          className={inputClasses}
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search..."
        />
        {spinner}
        {clearBtn}
      </div>
      {queryList}
    </div>
  );
};

export default Search;
