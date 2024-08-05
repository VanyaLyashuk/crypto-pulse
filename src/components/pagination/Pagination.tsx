import clsx from "clsx";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { DOTS, usePagination } from "../../hooks/usePagination";
import { IPaginationComponentProps, TPaginationButton } from "../../models";

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

  // Ensure paginationRange is not empty and has valid data
  if (!paginationRange || paginationRange.length < 2) {
    return null;
  }

  const lastPage = paginationRange[paginationRange.length - 1] as number;

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === lastPage;

  const handleKeyUp = (
    e: React.KeyboardEvent<HTMLLIElement>,
    action: TPaginationButton,
    pageNumber?: number | string
  ) => {
    if (e.key === "" || e.key === "Enter") {
      if (action === "back" && !isFirstPage) onPageChange(currentPage - 1);
      if (action === "forward" && !isFirstPage) onPageChange(currentPage + 1);
      if (action === "go" && pageNumber) onPageChange(Number(pageNumber));
    }
  };

  const arrowClasses = (page: boolean): string =>
    clsx("px-4 py-2 cursor-pointer", {
      "text-gray-400": page,
    });

  return (
    <ul className="flex items-center text-base">
      <li
        tabIndex={0}
        onClick={() => !isFirstPage && onPageChange(currentPage - 1)}
        onKeyUp={(e) => handleKeyUp(e, "back")}
        className={arrowClasses(isFirstPage)}
      >
        <IoIosArrowBack />
      </li>
      {paginationRange.map((pageNumber: number | string, index) => {
        if (pageNumber === DOTS) {
          return <li key={`dots-${index}`}>&#8230;</li>;
        }

        return (
          <li
            key={pageNumber}
            tabIndex={0}
            className={clsx("px-4 py-2 rounded-md cursor-pointer", {
              "bg-slate-100": pageNumber === currentPage,
            })}
            onClick={() => onPageChange(Number(pageNumber))}
            onKeyUp={(e) => handleKeyUp(e, "go", pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        tabIndex={0}
        onClick={() => !isLastPage && onPageChange(currentPage + 1)}
        onKeyUp={(e) => handleKeyUp(e, "next")}
        className={arrowClasses(isLastPage)}
      >
        <IoIosArrowForward />
      </li>
    </ul>
  );
};

export default Pagination;
