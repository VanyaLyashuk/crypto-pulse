import clsx from "clsx";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { DOTS, usePagination } from "../../hooks/usePagination";
import { IPaginationComponentProps } from "../../models";

const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}: IPaginationComponentProps) => {
  const paginationRange = usePagination({
    totalCount,
    currentPage,
    siblingCount,
    pageSize,
  });

  if (!paginationRange || paginationRange.length < 2) {
    return null;
  }

  const lastPage = paginationRange[paginationRange.length - 1] as number;

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === lastPage;

  const arrowClasses = (page: boolean): string =>
    clsx("px-2 py-1 cursor-pointer sm:px-4 sm:py-2", {
      "text-gray-400": page,
    });

  return (
    <ul className="flex items-stretch text-base sm:gap-1">
      <li className="flex">
        <button
          onClick={() => !isFirstPage && onPageChange(currentPage - 1)}
          className={arrowClasses(isFirstPage)}
        >
          <IoIosArrowBack />
        </button>
      </li>
      {paginationRange.map((pageNumber: number | string, index) => {
        if (pageNumber === DOTS) {
          return (
            <li className="px-2 py-1 sm:px-4 sm:py-2" key={`dots-${index}`}>
              ...
            </li>
          );
        }

        return (
          <li key={pageNumber}>
            <button
              className={clsx(
                "px-2.5 py-1 text-base rounded-md cursor-pointer sm:px-4 sm:py-2",
                {
                  "bg-slate-100 dark:bg-darkModeBgLighter": pageNumber === currentPage,
                }
              )}
              onClick={() => onPageChange(Number(pageNumber))}
            >
              {pageNumber}
            </button>
          </li>
        );
      })}
      <li className="flex">
        <button
          onClick={() => !isLastPage && onPageChange(currentPage + 1)}
          className={arrowClasses(isLastPage)}
        >
          <IoIosArrowForward />
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
