import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import React, { useMemo } from "react";
import { FaRegStar } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { ICryptoCurrency } from "../../models";

const CryptoTable: React.FC = () => {
  const data: ICryptoCurrency[] = useMemo(
    () => [
      {
        id: 1,
        coin: "Bitcoin BTC",
        coinImg:
          "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
        price: "$67,761.39",
        change1h: "-0.2%",
        change24h: "-0.7%",
        change7d: "-2.1%",
        volume24h: "$27,715,149,560",
        marketCap: "$1,349,286,894,819",
      },
      {
        id: 2,
        coin: "Ethereum ETH",
        coinImg:
          "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628",
        price: "$3,802.96",
        change1h: "-0.2%",
        change24h: "-2.0%",
        change7d: "-2.7%",
        volume24h: "$16,828,912,808",
        marketCap: "$463,820,301,586",
      },
      {
        id: 3,
        coin: "DOG•GO•TO•THE•MOON (Runes)",
        coinImg:
          "https://assets.coingecko.com/coins/images/37352/standard/DOGGOTOTHEMOON.png?1714096969",
        price: "$3,802.96",
        change1h: "-0.2%",
        change24h: "-2.0%",
        change7d: "-2.7%",
        volume24h: "$16,828,912,808",
        marketCap: "$463,820,301,586",
      },
    ],
    []
  );

  const columns: ColumnDef<ICryptoCurrency>[] = useMemo(
    () => [
      {
        header: () => "",
        id: "favorite",
        cell: () => (
          <button>
            <FaRegStar />
          </button>
        ),
        size: 38,
      },
      {
        header: "#",
        accessorKey: "id",
      },
      {
        header: "Coin",
        accessorKey: "coin",
        cell: ({ row }) => (
          <div className="flex items-center">
            <img
              src={row.original.coinImg}
              alt={row.original.coin}
              className="w-6 h-6 mr-2"
              style={{ flexShrink: 0 }}
            />
            <div className="overflow-hidden break-words">
              {row.original.coin}
            </div>
          </div>
        ),
      },
      { header: "Price", accessorKey: "price" },
      { header: "1h", accessorKey: "change1h" },
      { header: "24h", accessorKey: "change24h" },
      { header: "7d", accessorKey: "change7d" },
      { header: "24h Volume", accessorKey: "volume24h" },
      { header: "Market Cap", accessorKey: "marketCap" },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const stickyCellClasses = "sticky left-0 bg-white z-10 min-w-[130px]";

  return (
    <div className="overflow-x-auto max-w-[1300px] m-auto">
      <table className="min-w-full divide-y divide-gray-300 shadow table-auto sm:rounded-lg">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const cellClasses = clsx(
                  "px-3 py-4 text-sm font-bold tracking-wider text-left text-gray-700 bg-white cursor-pointer group",
                  { [stickyCellClasses]: header.column.id === "coin" }
                );
                return (
                  <th
                    key={header.id}
                    scope="col"
                    className={cellClasses}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      <span>
                        {header.column.getIsSorted() ? (
                          header.column.getIsSorted() === "desc" ? (
                            <IoIosArrowDown />
                          ) : (
                            <IoIosArrowUp />
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
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => {
                const cellClasses = clsx(
                  "px-3 py-4 text-sm text-gray-500 bg-white",
                  {
                    "w-9": cell.column.id === "favorite",
                    [stickyCellClasses]: cell.column.id === "coin",
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
