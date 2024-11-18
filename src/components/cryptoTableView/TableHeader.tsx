import { flexRender, HeaderGroup } from "@tanstack/react-table";
import clsx from "clsx";
import { FC } from "react";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";

interface TableHeaderProps {
  headerGroup: HeaderGroup<any>;
}

const TableHeader: FC<TableHeaderProps> = ({ headerGroup }) => {
  return (
    <tr key={headerGroup.id}>
      {headerGroup.headers.map((header, index) => {
        const cellClasses = clsx(
          "px-2 py-[17px] text-base font-bold tracking-wider bg-primary-bg group text-typewriter-text",
          {
            "table-sticky-cell": header.column.id === "name",
            "pl-4": header.column.id === "favorite",
            "pr-4": header.column.id === "sparkline_in_7d",
          }
        );
        return (
          <th key={header.id} scope="col" className={cellClasses}>
            <div
              tabIndex={0}
              onClick={header.column.getToggleSortingHandler()}
              className={clsx(
                "flex items-center gap-0.5 focus-visible-outline max-w-fit cursor-pointer",
                {
                  "justify-end whitespace-nowrap ml-auto": index > 2,
                }
              )}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  header.column.getToggleSortingHandler()?.(event);
                }
              }}
            >
              <span>
                {header.column.getIsSorted() ? (
                  header.column.getIsSorted() === "desc" ? (
                    <BiSolidDownArrow className="table-head-arrow" />
                  ) : (
                    <BiSolidUpArrow className="table-head-arrow" />
                  )
                ) : (
                  header.column.getCanSort() && (
                    <BiSolidDownArrow className="transition-opacity opacity-0 table-head-arrow group-hover:opacity-100 group-focus-within:opacity-100" />
                  )
                )}
              </span>
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
            </div>
          </th>
        );
      })}
    </tr>
  );
};

export default TableHeader;
