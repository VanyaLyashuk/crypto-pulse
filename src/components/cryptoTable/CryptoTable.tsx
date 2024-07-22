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
import CryptoTableSkeleton from "../cryptoTableSkeleton/CryptoTableSkeleton";
import PriceChangeCell from "./PriceChangeCell";
import SparklineChart from "./SparklineChart";

const CryptoTable: React.FC = () => {
  const [coins, setCoins] = useState<ITransformedCoinsMarketData[]>([]);
  const [coinsPerPage, setCoinsPerPage] = useState<number>(30);
  const [loading, setLoading] = useState<boolean>(true);

  const coinGeckoService = new CoinGeckoService();

  useEffect(() => {
    coinGeckoService._getCoinsListWithMarketData().then((res) => {
      setCoins(res);
      setLoading(false);
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
            <span className="text-gray-500 uppercase">{row.original.symbol}</span>
          </div>
        </div>
      ),
      size: 500,
      minSize: 150,
      maxSize: 500,
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
      size: 70,
      minSize: 70,
      maxSize: 125,
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
      size: 70,
      minSize: 70,
      maxSize: 125,
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
      size: 70,
      minSize: 70,
      maxSize: 125,
      enableSorting: true,
    },
    {
      header: "24h Volume",
      accessorKey: "total_volume",
      size: 100,
      minSize: 100,
      maxSize: 400,
      enableSorting: true,
    },
    { 
      header: "Market Cap", 
      accessorKey: "market_cap",
      size: 100,
      minSize: 100,
      maxSize: 400,
      enableSorting: true 
    },
    {
      header: "Last 7 Days",
      accessorKey: "sparkline_in_7d",
      cell: ({ row }) => {
        const { price } = row.original.sparkline_in_7d;

        return <SparklineChart price={price} />;
      },
      size: 151,
      minSize: 151,
      maxSize: 151,
      enableSorting: false,
    },
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
      {loading ? (
        <CryptoTableSkeleton coinsPerPage={coinsPerPage} />
      ) : (
        <table className="min-w-full shadow table-auto sm:rounded-lg">
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
                          "justify-end": index > 2,
                        })}
                      >
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
                {row.getVisibleCells().map((cell, index) => {
                  const cellClasses = clsx(
                    "p-2 text-sm text-gray-700 bg-white",
                    {
                      "w-8": cell.column.id === "favorite",
                      "table-sticky-cell": cell.column.id === "name",
                      "text-right": index > 2,
                    }
                  );
                  return (
                    <td
                      key={cell.id}
                      className={cellClasses}
                      style={{ width: cell.column.getSize() }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CryptoTable;
