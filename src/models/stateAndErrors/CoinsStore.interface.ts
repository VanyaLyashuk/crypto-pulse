import { ITransformedCoinsMarketData } from "../dataTypes/TransformedCoinsMarketData.interface";


export interface ICoinsStore {
  coins: ITransformedCoinsMarketData[];
  setCoins: (coins: ITransformedCoinsMarketData[]) => void;
  totalCoins: number;
  setTotalCoins: (total: number) => void;
  removeCoin: (coinId: string) => void;
}