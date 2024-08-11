import clsx from "clsx";
import React from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { ICryptoTableRowsPerPageProps } from "../../models";

const CryptoTableRowsPerPage: React.FC<ICryptoTableRowsPerPageProps> = ({
  rowsPerPage,
  onRowsChange,
  isOpen,
  onToggleRowsSelect,
  options,
}) => {
  const arrowClasses = clsx({ "rotate-180": isOpen });
  const listClasses = clsx(
    "absolute right-0 z-40 bg-white border rounded-md w-36 transition-all top-[34px]",
    { "invisible opacity-0 top-0": !isOpen }
  );

  const handleKeyUp = (e: React.KeyboardEvent<HTMLLIElement>) => {
    if (e.key === "" || e.key === "Enter") {
      onRowsChange(e);
    }
  };

  return (
    <div className="relative ml-auto">
      <button
        className="flex items-center px-2 py-1 text-sm font-medium border rounded-md"
        type="button"
        onClick={onToggleRowsSelect}
      >
        {rowsPerPage}
        <span>
          <MdOutlineKeyboardArrowDown className={arrowClasses} />
        </span>
      </button>
      <ul className={listClasses}>
        {options.map((item) => {
          const liClasses = clsx(
            "w-full p-2 text-sm border-b cursor-pointer last:border-b-0 hover-hover:hover:bg-slate-50 focus:bg-slate-50",
            { "bg-slate-100": rowsPerPage === item }
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
