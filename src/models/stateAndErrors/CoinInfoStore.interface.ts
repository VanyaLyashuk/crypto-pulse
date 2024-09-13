import { ITransformedCoinsMarketData } from "../dataTypes/TransformedCoinsMarketData.interface";

export interface ICoinInfoStore {
  selectedCoinId: string;
  setSelectedCoinId: (id: string) => void;
  selectedCoin: ITransformedCoinsMarketData;
  setSelectedCoin: (id: string) => void;
}