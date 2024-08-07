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
    clsx("px-4 py-2 cursor-pointer", {
      "text-gray-400": page,
    });

  return (
    <ul className="flex items-center gap-1 text-base">
      <li>
        <button
          onClick={() => !isFirstPage && onPageChange(currentPage - 1)}
          className={arrowClasses(isFirstPage)}
        >
          <IoIosArrowBack />
        </button>
      </li>
      {paginationRange.map((pageNumber: number | string, index) => {
        if (pageNumber === DOTS) {
          return <li key={`dots-${index}`}>&#8230;</li>;
        }

        return (
          <li
            key={pageNumber}
          >
            <button
              className={clsx("px-4 py-2 rounded-md cursor-pointer", {
                "bg-slate-100": pageNumber === currentPage,
              })}
              onClick={() => onPageChange(Number(pageNumber))}
            >
              {pageNumber}
            </button>
          </li>
        );
      })}
      <li>
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
