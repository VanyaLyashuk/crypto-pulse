import { ITransformedCoinsMarketData } from "../dataTypes/TransformedCoinsMarketData.interface";

export interface ICoinInfoStore {
  selectedCoin: ITransformedCoinsMarketData;
  setSelectedCoin: (id: string) => void;
}