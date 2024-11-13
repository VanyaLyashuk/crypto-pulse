import debounce from "debounce";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import useCoinGeckoService from "../services/CoinGeckoService";
import useCoinsStore from "../store/coins.store";
import useFavoritesStore from "../store/favorites.store";
import usePaginationStore from "../store/pagination.store";
import useTableViewStore from "../store/tableView.store";

const useCryptoTableData = () => {
  const [loadingDelay, setLoadingDelay] = useState<boolean>(true);

  const { setCoins, totalCoins, setTotalCoins } = useCoinsStore(
    useShallow((state) => ({
      setCoins: state.setCoins,
      totalCoins: state.totalCoins,
      setTotalCoins: state.setTotalCoins,
    }))
  );

  const { rows, setIsRowsSelectOpen } = useTableViewStore(
    useShallow((state) => ({
      rows: state.rows,
      setIsRowsSelectOpen: state.setIsRowsSelectOpen,
    }))
  );

  const { currentPage, setCurrentPage, lastPage, setLastPage } =
    usePaginationStore(
      useShallow((state) => ({
        currentPage: state.currentPage,
        setCurrentPage: state.setCurrentPage,
        lastPage: state.lastPage,
        setLastPage: state.setLastPage,
      }))
    );

  const { favorites, showFavorites, hideFavorites } = useFavoritesStore(
    useShallow((state) => ({
      favorites: state.favorites,
      showFavorites: state.showFavorites,
      hideFavorites: state.hideFavorites,
    }))
  );

  const { loading, error, getCoinsListWithMarketData, getCoinsListLength } =
    useCoinGeckoService();

  useEffect(() => {
    if (loading) {
      setLoadingDelay(true);
    } else {
      const timer = setTimeout(() => setLoadingDelay(false), 200);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  useEffect(() => {
    onTotalCoinsRequest();
  }, [showFavorites]);

  useEffect(() => {
    if (lastPage) {
      onCoinsDataRequest();
      setIsRowsSelectOpen(false);
    }
  }, [currentPage, lastPage]);

  useEffect(() => {
    if (showFavorites) {
      if (favorites.length) {
        setTotalCoins(favorites.length);
      } else {
        hideFavorites();
      }
    }
  }, [favorites, showFavorites]);

  useEffect(() => {
    const calculatedLastPage = Math.ceil(totalCoins / rows);
    setLastPage(calculatedLastPage);

    if (calculatedLastPage && currentPage > calculatedLastPage) {
      setCurrentPage(calculatedLastPage);
    }
  }, [totalCoins, rows]);

  const handlePageChange = debounce(
    (page: number, setCurrentPage: (page: number) => void): void => {
      setCurrentPage(page);
    },
    300
  );

  const onCoinsDataRequest = () => {
    setLoadingDelay(true);
    let ids = "";

    if (showFavorites && favorites.length) {
      ids = favorites.join("%2C");
    }

    getCoinsListWithMarketData(rows, currentPage, ids).then((res) => {
      setCoins(res);
    });
  };

  const onTotalCoinsRequest = () => {
    if (!showFavorites) {
      getCoinsListLength().then((res) => {
        setTotalCoins(res);
      });
    }
  };

  return {
    loading,
    loadingDelay,
    error,
    totalCoins,
    currentPage,
    rows,
    setCurrentPage,
    handlePageChange,
  };
};

export default useCryptoTableData;
