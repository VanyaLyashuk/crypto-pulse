import {
  Cell,
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
import useCoinInfoModal from "../../hooks/useCoinInfoModal";
import {
  ICryptoTableViewProps,
  ITransformedCoinsMarketData,
  TCryptoTableCellContext,
} from "../../models";
import useCoinsStore from "../../store/coins.store";
import { renderCurrencyCell } from "../../utils/CryptoTableUtils";
import CryptoTableSparklineChart from "../cryptoTableSparklineChart/CryptoTableSparklineChart";
import FavoritesButton from "../favoritesButton/FavoritesButton";
import PriceChangeIndicator from "../priceChangeIndicator/PriceChangeIndicator";

const renderPriceChangeCell = () => (info: TCryptoTableCellContext) => {
  const value = info.getValue<number>();
  return <PriceChangeIndicator arrowSize="w-3 h-3" value={value} />;
};

const CryptoTableView: React.FC<ICryptoTableViewProps> = ({ currency }) => {
  const [sorting, setSorting] = useState([
    { id: "market_cap_rank", desc: false },
  ]);

  const coins = useCoinsStore((state) => state.coins);

  const { openModal } = useCoinInfoModal();

  const getCellClasses = (
    cell: Cell<ITransformedCoinsMarketData, unknown>,
    index: number
  ) => {
    return clsx(
      "px-2 py-1 text-base bg-primary-bg hover-hover:group-hover:bg-search-bg",
      {
        "w-8": cell.column.id === "favorite",
        "table-sticky-cell": cell.column.id === "name",
        "text-right": index > 2,
      }
    );
  };

  const columns = useMemo(
    () => [
      {
        header: () => <FavoritesButton isHeader={true} />,
        id: "favorite",
        cell: ({ row }: { row: Row<ITransformedCoinsMarketData> }) => (
          <FavoritesButton coinId={row.original.id} />
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
          <button className="flex items-center focus-visible-outline">
            <img
              src={row.original.image}
              alt={row.original.name}
              className="object-contain w-6 h-6 mr-2 shrink-0"
            />
            <div className="overflow-hidden text-left break-words">
              <span className="font-medium">{row.original.name}</span>{" "}
              <span className="uppercase text-secondary-text">
                {row.original.symbol}
              </span>
            </div>
          </button>
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
    <table className="min-w-full transition-all table-auto crypto-table sm:rounded-lg">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header, index) => {
              const cellClasses = clsx(
                "px-2 py-3 text-base font-bold tracking-wider bg-primary-bg group text-typewriter-text",
                { "table-sticky-cell": header.column.id === "name" }
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
        ))}
      </thead>
      <tbody className="bg-primary-bg">
        {table.getRowModel().rows.map((row) => (
          <tr
            key={row.original.id}
            onClick={() => openModal(row.original.id)}
            className="cursor-pointer group"
          >
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
