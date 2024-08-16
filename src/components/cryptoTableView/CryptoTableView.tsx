import {
  CellContext,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  Row,
  useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import { useMemo, useState } from "react";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { FaRegStar } from "react-icons/fa";
import {
  ICryptoTableViewProps,
  ITransformedCoinsMarketData,
  TCryptoTableCellContext,
} from "../../models";
import { renderCurrencyCell } from "../../utils/CryptoTableUtils";
import CryptoTablePriceChangeCell from "../cryptoTablePriceChangeCell/CryptoTablePriceChangeCell";
import CryptoTableSparklineChart from "../cryptoTableSparklineChart/CryptoTableSparklineChart";

const renderPriceChangeCell = () => (info: TCryptoTableCellContext) => {
  const value = info.getValue<number>();
  return <CryptoTablePriceChangeCell value={value} />;
};

const CryptoTableView: React.FC<ICryptoTableViewProps> = ({
  coins,
  getCellClasses,
  currency,
}) => {
  const [sorting, setSorting] = useState([
    { id: "market_cap_rank", desc: false },
  ]);

  const columns = useMemo(
    () => [
      {
        header: () => "",
        id: "favorite",
        cell: () => (
          <button>
            <FaRegStar />
          </button>
        ),
        size: 32,
        enableSorting: false,
      },
      {
        header: "#",
        accessorKey: "market_cap_rank",
        size: 32,
        minSize: 32,
        maxSize: 125,
        enableSorting: true,
        cell: (info: CellContext<ITransformedCoinsMarketData, number>) => {
          const value = info.getValue<number>();
          return value ? value : "-";
        },
      },
      {
        header: "Coin",
        accessorKey: "name",
        size: 500,
        minSize: 200,
        maxSize: 500,
        enableSorting: true,
        cell: ({ row }: { row: Row<ITransformedCoinsMarketData> }) => (
          <div className="flex items-center">
            <img
              src={row.original.image}
              alt={row.original.name}
              className="w-6 h-6 mr-2"
              style={{ flexShrink: 0 }}
            />
            <div className="overflow-hidden break-words">
              <span className="font-medium">{row.original.name}</span>{" "}
              <span className="text-gray-500 uppercase">
                {row.original.symbol}
              </span>
            </div>
          </div>
        ),
      },
      {
        header: "Price",
        accessorKey: "current_price",
        enableSorting: true,
        cell: renderCurrencyCell(currency, { minimumFractionDigits: 2 }),
      },
      {
        header: "1h",
        accessorKey: "price_change_percentage_1h_in_currency",
        size: 70,
        minSize: 70,
        maxSize: 125,
        enableSorting: true,
        cell: renderPriceChangeCell(),
      },
      {
        header: "24h",
        accessorKey: "price_change_percentage_24h_in_currency",
        size: 70,
        minSize: 70,
        maxSize: 125,
        enableSorting: true,
        cell: renderPriceChangeCell(),
      },
      {
        header: "7d",
        accessorKey: "price_change_percentage_7d_in_currency",
        size: 70,
        minSize: 70,
        maxSize: 125,
        enableSorting: true,
        cell: renderPriceChangeCell(),
      },
      {
        header: "24h Volume",
        accessorKey: "total_volume",
        size: 150,
        minSize: 150,
        maxSize: 400,
        enableSorting: true,
        cell: renderCurrencyCell(currency),
      },
      {
        header: "Market Cap",
        accessorKey: "market_cap",
        size: 110,
        minSize: 110,
        maxSize: 400,
        enableSorting: true,
        cell: renderCurrencyCell(currency),
      },
      {
        header: "Last 7 Days",
        accessorKey: "sparkline_in_7d",
        size: 151,
        minSize: 151,
        maxSize: 151,
        enableSorting: false,
        cell: ({ row }: { row: Row<ITransformedCoinsMarketData> }) => {
          const { price } = row.original.sparkline_in_7d;
          return <CryptoTableSparklineChart price={price} />;
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data: coins,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableSortingRemoval: false,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });

  return (
    <table className="min-w-full transition-all table-auto sm:rounded-lg">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header, index) => {
              const cellClasses = clsx(
                "px-2 py-4 text-sm font-bold tracking-wider text-gray-700 bg-white cursor-pointer group",
                { "table-sticky-cell": header.column.id === "name" }
              );
              return (
                <th
                  key={header.id}
                  scope="col"
                  className={cellClasses}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <div
                    className={clsx("flex items-center gap-0.5", {
                      "justify-end whitespace-nowrap": index > 2,
                    })}
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
                          <BiSolidDownArrow className="transition-opacity opacity-0 table-head-arrow group-hover:opacity-100" />
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
        ))}
      </thead>
      <tbody className="bg-white ">
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell, index) => {
              return (
                <td
                  key={cell.id}
                  className={getCellClasses(cell, index)}
                  style={{ width: cell.column.getSize() }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CryptoTableView;
