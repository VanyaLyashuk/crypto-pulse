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
import { FaRegStar } from "react-icons/fa";
import useCoinInfoModal from "../../hooks/useCoinInfoModal";
import useFormattedSmallCurrency from "../../hooks/useFormattedSmallCurrency";
import {
  ICryptoTableViewProps,
  ITransformedCoinsMarketData,
  TCryptoTableCellContext,
  TCryptoTableCurrency,
} from "../../models";
import useCoinsStore from "../../store/coins.store";
import { formatCurrencyValue } from "../../utils/CryptoTableUtils";
import CryptoTableSparklineChart from "../cryptoTableSparklineChart/CryptoTableSparklineChart";
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
    return clsx("px-2 py-[2px] text-sm bg-primary-bg", {
      "w-8": cell.column.id === "favorite",
      "table-sticky-cell": cell.column.id === "name",
      "text-right": index > 2,
    });
  };

  const renderCurrencyCell =
    (currency: TCryptoTableCurrency, options?: Intl.NumberFormatOptions) =>
    (info: TCryptoTableCellContext) => {
      const value = info.getValue<number>();

      if (value === null) {
        return "-";
      }

      if (value < 1) {
        const fractionalPart = value.toString().split(".")[1] || "";
        const leadingZeros = fractionalPart.match(/^0+/)?.[0].length || 0;

        if (leadingZeros >= 4) {
          return useFormattedSmallCurrency(value, currency, options);
        }
      }

      return formatCurrencyValue(value, currency, options);
    };

  const columns = useMemo(
    () => [
      {
        header: () => "",
        id: "favorite",
        cell: () => (
          <button disabled>
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
              className="object-contain w-6 h-6 mr-2"
              style={{ flexShrink: 0 }}
            />
            <div className="overflow-hidden break-words">
              <span className="font-medium">{row.original.name}</span>{" "}
              <span className="uppercase text-secondary-text">
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
    <table className="min-w-full transition-all table-auto crypto-table sm:rounded-lg">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header, index) => {
              const cellClasses = clsx(
                "px-2 py-[17px] text-sm font-bold tracking-wider bg-primary-bg cursor-pointer group",
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
      <tbody className="bg-primary-bg">
        {table.getRowModel().rows.map((row) => (
          <tr
            key={row.original.id}
            onClick={() => openModal(row.original.id)}
            className="cursor-pointer"
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
