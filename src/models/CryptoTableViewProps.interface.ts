import { Cell } from "@tanstack/react-table";
import { TCryptoTableCurrency } from "./CryptoTableCurrency.type";
import { ITransformedCoinsMarketData } from "./TransformedCoinsMarketData.interface";

export interface ICryptoTableViewProps {
  coins: ITransformedCoinsMarketData[];
  getCellClasses: (
    cell: Cell<ITransformedCoinsMarketData, unknown>,
    index: number
  ) => string;
  currency: TCryptoTableCurrency;
}
