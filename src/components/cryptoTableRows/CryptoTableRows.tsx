import clsx from "clsx";
import React from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useShallow } from "zustand/react/shallow";

import { ICryptoTableRowsProps } from "../../models";
import useTableViewStore from "../../store/tableView.store";

const CryptoTableRows: React.FC<ICryptoTableRowsProps> = ({ options }) => {
  const { rows, setRows, isRowsSelectOpen, setIsRowsSelectOpen } =
    useTableViewStore(
      useShallow((state) => ({
        rows: state.rows,
        setRows: state.setRows,
        isRowsSelectOpen: state.isRowsSelectOpen,
        setIsRowsSelectOpen: state.setIsRowsSelectOpen,
      }))
    );

  const onRowsChange = (
    e: React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>
  ) => {
    setRows(Number(e.currentTarget.getAttribute("data-value")));
    setIsRowsSelectOpen(false);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLLIElement>) => {
    if (e.key === "" || e.key === "Enter") {
      onRowsChange(e);
    }
  };

  const arrowClasses = clsx({ "rotate-180": isRowsSelectOpen });
  const listClasses = clsx(
    "absolute right-0 z-40 bg-primary-bg border border-select-border-color rounded-md w-36 transition-all top-10 shadow-lg",
    { "invisible opacity-0 top-0": !isRowsSelectOpen }
  );

  const listItems = options.map((item) => {
    const liClasses = clsx(
      "w-full p-2 text-base border-b border-b-select-border-color cursor-pointer last:border-b-0 focus-visible-outline relative first:rounded-t-md last:rounded-b-md",
      { "bg-select-bg": rows === item }
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
  });

  return (
    <div className="relative ml-auto max-w-fit">
      <button
        className="flex items-center px-2 py-1 text-base font-medium border rounded-md border-select-border-color focus-visible-outline bg-primary-bg"
        type="button"
        onClick={() => setIsRowsSelectOpen(!isRowsSelectOpen)}
      >
        {rows}
        <span>
          <MdOutlineKeyboardArrowDown className={arrowClasses} />
        </span>
      </button>
      <ul className={listClasses}>
        {listItems}
      </ul>
    </div>
  );
};

export default CryptoTableRows;
