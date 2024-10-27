import debounce from "debounce";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import useCoinGeckoService from "../../services/CoinGeckoService";
import useCoinsStore from "../../store/coins.store";
import usePaginationStore from "../../store/pagination.store";
import useTableViewStore from "../../store/tableView.store";
import CryptoTableRowsPerPage from "../cryptoTableRowsPerPage/CryptoTableRowsPerPage";
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

  const { rowsPerPage, setIsRowsSelectOpen } = useTableViewStore(
    useShallow((state) => ({
      rowsPerPage: state.rowsPerPage,
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

  const { loading, error, getCoinsListWithMarketData, getCoinsListLength } =
    useCoinGeckoService();

  useEffect(() => {
    onTotalCoinsRequest();
  }, []);

  useEffect(() => {
    setLastPage(Math.ceil(totalCoins / rowsPerPage));
  }, [totalCoins, rowsPerPage]);

  useEffect(() => {
    if (lastPage && currentPage > lastPage) {
      setCurrentPage(lastPage);
    } else if (lastPage) {
      onCoinsDataRequest();
      setIsRowsSelectOpen(false);
    }
  }, [currentPage, lastPage]);

  useEffect(() => {
    if (lastPage && currentPage > lastPage) {
      setCurrentPage(lastPage);
    }
  }, [rowsPerPage]);

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

    getCoinsListWithMarketData("usd", rowsPerPage, currentPage).then((res) => {
      setCoins(res);
    });
  };

  const onTotalCoinsRequest = () => {
    getCoinsListLength().then((res) => {
      setTotalCoins(res);
    });
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
      <CryptoTableSkeleton rowsPerPage={rowsPerPage} />
    ) : null;

  const tableContent =
    !error && !loading && !loadingDelay ? (
      <CryptoTableView currency="$" />
    ) : null;

  return (
    <>
      {errMsg ? (
        errMsg
      ) : (
        <div className="py-5 ">
          <div className="container">
            <CryptoTableRowsPerPage options={[30, 50, 100]} />
          </div>
          <div className="container px-0 mb-4 overflow-x-auto ">
            {skeleton}
            {tableContent}
          </div>
          <div className="container">            
            <Pagination
              currentPage={currentPage}
              totalCount={totalCoins}
              pageSize={rowsPerPage}
              onPageChange={(page: number) =>
                handlePageChange(page, setCurrentPage)
              }
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CryptoTable;
