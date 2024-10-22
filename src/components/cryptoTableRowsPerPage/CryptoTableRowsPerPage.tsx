import clsx from "clsx";
import React from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { ICryptoTableRowsPerPageProps } from "../../models";
import useTableViewStore from "../../store/tableView.store";

const CryptoTableRowsPerPage: React.FC<ICryptoTableRowsPerPageProps> = ({
  options,
}) => {
  const { rowsPerPage, setRowsPerPage, isRowsSelectOpen, setIsRowsSelectOpen } =
    useTableViewStore();
  const arrowClasses = clsx({ "rotate-180": isRowsSelectOpen });
  const listClasses = clsx(
    "absolute right-0 z-40 bg-primary-bg border border-select-border-color rounded-md w-36 transition-all top-[34px]",
    { "invisible opacity-0 top-0": !isRowsSelectOpen }
  );

  const onRowsChange = (
    e: React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>
  ) => {
    setRowsPerPage(Number(e.currentTarget.getAttribute("data-value")));
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLLIElement>) => {
    if (e.key === "" || e.key === "Enter") {
      onRowsChange(e);
    }
  };

  return (
    <div className="relative ml-auto">
      <button
        className="flex items-center px-2 py-1 text-sm font-medium border rounded-md border-select-border-color"
        type="button"
        onClick={() => setIsRowsSelectOpen(!isRowsSelectOpen)}
      >
        {rowsPerPage}
        <span>
          <MdOutlineKeyboardArrowDown className={arrowClasses} />
        </span>
      </button>
      <ul className={listClasses}>
        {options.map((item) => {
          const liClasses = clsx(
            "w-full p-2 text-sm border-b border-b-select-border-color cursor-pointer last:border-b-0 hover-hover:hover:bg-select-bg-hover focus:bg-select-bg-hover",
            { "bg-select-bg": rowsPerPage === item }
          );
          return (
            <li
              className={liClasses}
              onClick={onRowsChange}
              onKeyUp={handleKeyUp}
              key={item}
              data-value={item}
              tabIndex={0}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CryptoTableRowsPerPage;
