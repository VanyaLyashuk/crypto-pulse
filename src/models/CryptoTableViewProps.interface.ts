import { Cell } from "@tanstack/react-table";
import { ITransformedCoinsMarketData } from "./TransformedCoinsMarketData.interface";

export interface ICryptoTableViewProps {
  coins: ITransformedCoinsMarketData[];
  getCellClasses: (
    cell: Cell<ITransformedCoinsMarketData, unknown>,
    index: number
  ) => string;
}
