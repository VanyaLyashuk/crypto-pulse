import { Cell } from "@tanstack/react-table";
import { TCryptoTableCurrency } from "../dataTypes/CryptoTableCurrency.type";
import { ITransformedCoinsMarketData } from "../dataTypes/TransformedCoinsMarketData.interface";

export interface ICryptoTableViewProps {
  coins: ITransformedCoinsMarketData[];
  getCellClasses: (
    cell: Cell<ITransformedCoinsMarketData, unknown>,
    index: number
  ) => string;
  currency: TCryptoTableCurrency;
}
