import debounce from "debounce";
import { useEffect, useState } from "react";
import { ISearchCoinResult } from "../models";
import useCoinGeckoService from "../services/CoinGeckoService";

const useSearch = () => {
  const [query, setQuery] = useState<string>("");
  const [isFocusVisible, setIsFocusVisible] = useState<boolean>(false);
  const [data, setData] = useState<ISearchCoinResult[]>([]);

  const { loading, error, searchCoin, getTrendingSearchList } = useCoinGeckoService();

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

  const onTrendingListRequest = () => {
    getTrendingSearchList().then((res) => {
      setData(res);
    })
  }

  const debouncedSearch = debounce(onRequest, 500);
  const debouncedTrendingRequest = debounce(onTrendingListRequest, 500);

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
    } else {
      debouncedTrendingRequest();
    }
    return debouncedSearch.clear;
  }, [query]);

  return {
    loading,
    error,
    query,
    clearQuery,
    isFocusVisible,
    data,
    handleInputChange,
    showClearButton: !loading && !error && query,
    showQueryList: !loading && !error && data.length,
  };
};

export default useSearch;
