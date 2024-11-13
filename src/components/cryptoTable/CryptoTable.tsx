import debounce from "debounce";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import useCoinGeckoService from "../../services/CoinGeckoService";
import useCoinsStore from "../../store/coins.store";
import useFavoritesStore from "../../store/favorites.store";
import usePaginationStore from "../../store/pagination.store";
import useTableViewStore from "../../store/tableView.store";
import CryptoTableRows from "../cryptoTableRows/CryptoTableRows";
import CryptoTableSkeleton from "../cryptoTableSkeleton/CryptoTableSkeleton";
import CryptoTableView from "../cryptoTableView/CryptoTableView";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Pagination from "../pagination/Pagination";

const CryptoTable: React.FC = () => {
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
    onTotalCoinsRequest();
  }, [showFavorites]);

  useEffect(() => {
    setLastPage(Math.ceil(totalCoins / rows));
  }, [totalCoins, rows]);

  useEffect(() => {
    if (showFavorites && favorites.length) {
      onCoinsDataRequest();
    }
  },[showFavorites]);

  if (!favorites.length && showFavorites) {
    hideFavorites();
  }

  useEffect(() => {
    if (lastPage && currentPage > lastPage) {
      setCurrentPage(lastPage);
    } else if (lastPage && !showFavorites) {
      onCoinsDataRequest();
      setIsRowsSelectOpen(false);
    }
  }, [currentPage, lastPage]);

  useEffect(() => {
    if (lastPage && currentPage > lastPage) {
      setCurrentPage(lastPage);
    }
  }, [rows]);

  useEffect(() => {
    if (loading) {
      setLoadingDelay(true);
    } else {
      const timer = setTimeout(() => setLoadingDelay(false), 200);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  const onCoinsDataRequest = () => {
    setLoadingDelay(true);
    let ids = "";

    if (showFavorites && favorites.length) {
      ids = favorites.join("%2C");
    }

    getCoinsListWithMarketData(rows, currentPage, ids).then(
      (res) => {
        setCoins(res);
      }
    );
  };

  const onTotalCoinsRequest = () => {
    if (showFavorites) {
      setTotalCoins(favorites.length);
    } else {      
      getCoinsListLength().then((res) => {
        setTotalCoins(res);
      });
    }
  };

  const handlePageChange = debounce(
    (page: number, setCurrentPage: (page: number) => void): void => {
      setCurrentPage(page);
    },
    300
  );

  const errMsg = error ? (
    <ErrorMessage message="Ooops! Something went wrong!" />
  ) : null;

  const skeleton =
    loading || (loadingDelay && !error) ? (
      <CryptoTableSkeleton rowsPerPage={rows} />
    ) : null;

  const tableContent =
    !error && !loading && !loadingDelay ? (
      <CryptoTableView currency="$" />
    ) : null;

  return (
    <div className="pt-4">
      {errMsg ? (
        errMsg
      ) : (
        <>
          <div className="container mb-2">
            <CryptoTableRows options={[30, 50, 100]} />
          </div>
          <div className="container px-0 mb-4 overflow-x-auto lg:mb-6 max-w-[1284px] border border-select-border-color xl:rounded-md xl:shadow-md">
            {skeleton}
            {tableContent}
          </div>
          <div className="container mb-6 md:mb-8">
            <Pagination
              currentPage={currentPage}
              totalCount={totalCoins}
              pageSize={rows}
              onPageChange={(page: number) =>
                handlePageChange(page, setCurrentPage)
              }
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CryptoTable;
