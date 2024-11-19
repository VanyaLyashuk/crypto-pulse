import useCryptoTableData from "../../hooks/useCryptoTableData";
import CryptoTableSkeleton from "../cryptoTableSkeleton/CryptoTableSkeleton";
import CryptoTableView from "../cryptoTableView/CryptoTableView";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Pagination from "../pagination/Pagination";

const CryptoTable: React.FC = () => {
  const {
    loading,
    loadingDelay,
    error,
    totalCoins,
    currentPage,
    rows,
    setCurrentPage,
    handlePageChange,
  } = useCryptoTableData();

  const errorMessage = error ? (
    <ErrorMessage message="Ooops! Something went wrong!" />
  ) : null;

  const loadingSekeleton =
    loading || (loadingDelay && !error) ? (
      <CryptoTableSkeleton rowsPerPage={rows} />
    ) : null;

  const tableView =
    !error && !loading && !loadingDelay ? <CryptoTableView /> : null;

  return (
    <div className="pt-4">
      {errorMessage}
      {!error && (
        <>
          <div className="container px-0 mb-8 overflow-x-auto overflow-y-hidden lg:mb-10 max-w-[1284px] xl:rounded-md xl:shadow-md dark:shadow-lg">
            {loadingSekeleton}
            {tableView}
          </div>
          <div className="container md:mb-8">
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
