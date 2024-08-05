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
import {
  ICryptoTableRowsPerPageProps,
  ITransformedCoinsMarketData,
} from "../../models";
import CoinGeckoService from "../../services/CoinGeckoService";
import CryptoTableControls from "../cryptoTableControls/CryptoTableControls";
import CryptoTableRowsPerPage from "../cryptoTableRowsPerPage/CryptoTableRowsPerPage";
import CryptoTableSkeleton from "../cryptoTableSkeleton/CryptoTableSkeleton";
import Pagination from "../pagination/Pagination";
import PriceChangeCell from "./PriceChangeCell";
import SparklineChart from "./SparklineChart";

const CryptoTable: React.FC = () => {
  const [coins, setCoins] = useState<ITransformedCoinsMarketData[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCoins, setTotalCoins] = useState<number>(0);
  const [lastPage, setLastPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingDelay, setLoadingDelay] = useState<boolean>(true);

  const coinGeckoService = new CoinGeckoService();

  useEffect(() => {
    onCoinsDataRequest();
  }, [rowsPerPage, currentPage]);

  useEffect(() => {
    onTotalCoinsRequest();
  }, [rowsPerPage]);

  useEffect(() => {
    if (lastPage && currentPage > lastPage) {
      setCurrentPage(lastPage);
    } else if (lastPage && currentPage > 1) {
      return;
    }else  {
      setCurrentPage(1);
    }
  }, [lastPage]);

  useEffect(() => {
    if (loading) {
      setLoadingDelay(true);
    } else {
      const timer = setTimeout(() => setLoadingDelay(false), 300);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  const onCoinsDataRequest = () => {
    setLoading(true);

    coinGeckoService
      ._getCoinsListWithMarketData("usd", rowsPerPage, currentPage)
      .then((res) => {
        setCoins(res);
        setLoading(false);
      });
  }

  const onTotalCoinsRequest = () => {
    setLoading(true);

    coinGeckoService._getCoinsListLength().then((res) => {
      setTotalCoins(res);
      setLastPage(Math.ceil(res / rowsPerPage));
      setLoading(false);
    });
  };

  const onRowsChange: ICryptoTableRowsPerPageProps["onRowsChange"] = (e) => {
    setRowsPerPage(Number(e.currentTarget.getAttribute("data-value")));
  };

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
            <span className="text-gray-500 uppercase">
              {row.original.symbol}
            </span>
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
      size: 110,
      minSize: 110,
      maxSize: 400,
      enableSorting: true,
    },
    {
      header: "Market Cap",
      accessorKey: "market_cap",
      size: 110,
      minSize: 110,
      maxSize: 400,
      enableSorting: true,
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
    <>
      <CryptoTableControls>
        <CryptoTableRowsPerPage
          onRowsChange={onRowsChange}
          rowsPerPage={rowsPerPage}
        />
      </CryptoTableControls>
      <div className="m-auto max-w-[1300px] overflow-x-auto mb-3">
        {loading || loadingDelay ? (
          <CryptoTableSkeleton rowsPerPage={rowsPerPage} />
        ) : (
          <table className="min-w-full table-auto sm:rounded-lg">
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
      <CryptoTableControls>
        <Pagination
          currentPage={currentPage}
          totalCount={totalCoins}
          pageSize={rowsPerPage}
          onPageChange={(count: number) => setCurrentPage(count)}
        />
      </CryptoTableControls>
    </>
  );
};

export default CryptoTable;
