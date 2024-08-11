import clsx from "clsx";
import React, { useCallback, useEffect, useState } from "react";
import {
  ICryptoTableRowsPerPageProps,
  ICryptoTableViewProps,
  ITransformedCoinsMarketData,
} from "../../models";
import CoinGeckoService from "../../services/CoinGeckoService";
import CryptoTableControls from "../cryptoTableControls/CryptoTableControls";
import CryptoTableRowsPerPage from "../cryptoTableRowsPerPage/CryptoTableRowsPerPage";
import CryptoTableSkeleton from "../cryptoTableSkeleton/CryptoTableSkeleton";
import CryptoTableView from "../cryptoTableView/CryptoTableView";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Pagination from "../pagination/Pagination";

const CryptoTable: React.FC = () => {
  const [coins, setCoins] = useState<ITransformedCoinsMarketData[]>([]);
  const [totalCoins, setTotalCoins] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [isRowsSelectOpen, setIsRowsSelectOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingDelay, setLoadingDelay] = useState<boolean>(true);
  const [error, setError] = useState(false);

  const rowsSelectOptions: number[] = [10, 30, 50, 100];

  const coinGeckoService = new CoinGeckoService();

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
      const timer = setTimeout(() => setLoadingDelay(false), 500);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  const onLoading = () => {
    setLoading(true);
    setLoadingDelay(true);
    setError(false);
  };

  const onError = () => {
    setLoading(false);
    setError(true);
  };

  const onCoinsDataRequest = () => {
    onLoading();

    coinGeckoService
      ._getCoinsListWithMarketData("usd", rowsPerPage, currentPage)
      .then((res) => {
        setCoins(res);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching coins data:", error);
        onError();
      });
  };

  const onTotalCoinsRequest = () => {
    onLoading();

    coinGeckoService
      ._getCoinsListLength()
      .then((res) => {
        setTotalCoins(res);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching total coins data:", error);
        onError();
      });
  };

  const onToggleRowsSelect = useCallback(
    () => setIsRowsSelectOpen(!isRowsSelectOpen),
    [isRowsSelectOpen, setIsRowsSelectOpen]
  );

  const onRowsChange: ICryptoTableRowsPerPageProps["onRowsChange"] =
    useCallback(
      (e) => {
        setRowsPerPage(Number(e.currentTarget.getAttribute("data-value")));
      },
      [setRowsPerPage]
    );

  const getCellClasses: ICryptoTableViewProps["getCellClasses"] = (
    cell,
    index
  ) => {
    return clsx("p-2 text-sm text-gray-700 bg-white", {
      "w-8": cell.column.id === "favorite",
      "table-sticky-cell": cell.column.id === "name",
      "text-right": index > 2,
    });
  };

  const errMsg = error ? <ErrorMessage message="Ooops! Something went wrong!" /> : null;
  const skeleton =
    loading || (loadingDelay && !error) ? (
      <CryptoTableSkeleton rowsPerPage={rowsPerPage} />
    ) : null;
  const tableContent =
    !error && !loading && !loadingDelay ? (
      <CryptoTableView coins={coins} getCellClasses={getCellClasses} />
    ) : null;

  return (
    <>
      {errMsg ? (
        errMsg
      ) : (
        <>
          <CryptoTableControls>
            <CryptoTableRowsPerPage
              rowsPerPage={rowsPerPage}
              onRowsChange={onRowsChange}
              onToggleRowsSelect={onToggleRowsSelect}
              isOpen={isRowsSelectOpen}
              options={rowsSelectOptions}
            />
          </CryptoTableControls>
          <div className="m-auto max-w-[1300px] overflow-x-auto mb-3">
            {skeleton}
            {tableContent}
          </div>
          <CryptoTableControls>
            <Pagination
              currentPage={currentPage}
              totalCount={totalCoins}
              pageSize={rowsPerPage}
              onPageChange={(count: number) => setCurrentPage(count)}
            />
          </CryptoTableControls>
        </>
      )}
    </>
  );
};

export default CryptoTable;
