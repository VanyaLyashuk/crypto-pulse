import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { FaRegStar } from "react-icons/fa";
import { ITransformedCoinsMarketData } from "../../models";
import CoinGeckoService from "../../services/CoinGeckoService";
import PriceChangeCell from "./PriceChangeCell";

const CryptoTable: React.FC = () => {
  const [coins, setCoins] = useState<ITransformedCoinsMarketData[]>([]);

  const coinGeckoService = new CoinGeckoService();

  useEffect(() => {
    coinGeckoService._getCoinsListWithMarketData().then((res) => {
      setCoins(res);
    });
  }, []);

  const columns: ColumnDef<ITransformedCoinsMarketData>[] = [
    {
      header: () => "",
      id: "favorite",
      cell: () => (
        <button>
          <FaRegStar />
        </button>
      ),
      size: 38,
      enableSorting: false,
    },
    {
      header: "#",
      accessorKey: "market_cap_rank",
      enableSorting: true,
    },
    {
      header: "Coin",
      accessorKey: "name",
      cell: ({ row }) => (
        <div className="flex items-center">
          <img
            src={row.original.image}
            alt={row.original.name}
            className="w-6 h-6 mr-2"
            style={{ flexShrink: 0 }}
          />
          <div className="overflow-hidden break-words">
            <span className="font-medium">{row.original.name}</span>{" "}
            <span className="uppercase">{row.original.symbol}</span>
          </div>
        </div>
      ),
      enableSorting: true,
    },
    { header: "Price", accessorKey: "current_price", enableSorting: true },
    {
      header: "1h",
      accessorKey: "price_change_percentage_1h_in_currency",
      cell: ({ row }) => {
        const { value, isNegative } =
          row.original.price_change_percentage_1h_in_currency;
        return <PriceChangeCell value={value} isNegative={isNegative} />;
      },
      enableSorting: true,
    },
    {
      header: "24h",
      accessorKey: "price_change_percentage_24h_in_currency",
      cell: ({ row }) => {
        const { value, isNegative } =
          row.original.price_change_percentage_24h_in_currency;
        return <PriceChangeCell value={value} isNegative={isNegative} />;
      },
      enableSorting: true,
    },
    {
      header: "7d",
      accessorKey: "price_change_percentage_7d_in_currency",
      cell: ({ row }) => {
        const { value, isNegative } =
          row.original.price_change_percentage_7d_in_currency;
        return <PriceChangeCell value={value} isNegative={isNegative} />;
      },
      enableSorting: true,
    },
    {
      header: "24h Volume",
      accessorKey: "total_volume",
      enableSorting: true,
    },
    { header: "Market Cap", accessorKey: "market_cap", enableSorting: true },
  ];

  const table = useReactTable({
    data: coins,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableSortingRemoval: true,
  });

  return (
    <div className="overflow-x-auto max-w-[1300px] m-auto">
      <table className="min-w-full shadow table-auto sm:rounded-lg">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const cellClasses = clsx(
                  "px-3 py-4 text-sm font-bold tracking-wider text-left text-gray-700 bg-white cursor-pointer group",
                  { "table-sticky-cell": header.column.id === "name" }
                );
                return (
                  <th
                    key={header.id}
                    scope="col"
                    className={cellClasses}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-0.5">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      <span>
                        {header.column.getIsSorted() ? (
                          header.column.getIsSorted() === "desc" ? (
                            <BiSolidDownArrow className="table-head-arrow" />
                          ) : (
                            <BiSolidUpArrow className="table-head-arrow" />
                          )
                        ) : (
                          ""
                        )}
                      </span>
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
              {row.getVisibleCells().map((cell) => {
                const cellClasses = clsx(
                  "px-3 py-4 text-sm text-gray-500 bg-white",
                  {
                    "w-9": cell.column.id === "favorite",
                    "table-sticky-cell": cell.column.id === "name",
                  }
                );
                return (
                  <td key={cell.id} className={cellClasses}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;
