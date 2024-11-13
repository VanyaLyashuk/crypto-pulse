import { CellContext, Row } from "@tanstack/react-table";
import { ITransformedCoinsMarketData, TCryptoTableCellContext } from "../../models";
import { renderCurrencyCell } from "../../utils/CryptoTableUtils";
import CryptoTableSparklineChart from "../cryptoTableSparklineChart/CryptoTableSparklineChart";
import FavoritesButton from "../favoritesButton/FavoritesButton";
import PriceChangeIndicator from "../priceChangeIndicator/PriceChangeIndicator";

const renderPriceChangeCell = () => (info: TCryptoTableCellContext) => {
  const value = info.getValue<number>();
  return <PriceChangeIndicator arrowSize="w-3 h-3" value={value} />;
};

const currency = "$";

export const columns = [
  {
    header: () => <FavoritesButton isShowFavorites={true} />,
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
];