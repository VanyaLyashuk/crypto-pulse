import { ITransformedCoinsMarketData } from "../dataTypes/TransformedCoinsMarketData.interface";

export interface ICoinDetailsStore {
  selectedCoin: ITransformedCoinsMarketData;
  setSelectedCoin: (id: string) => void;
}