import { ITransformedCoinsMarketData } from "./TransformedCoinsMarketData.interface";

export interface ICoinWithHistoricalData extends ITransformedCoinsMarketData {
  historicalPriceData: number[];
}
