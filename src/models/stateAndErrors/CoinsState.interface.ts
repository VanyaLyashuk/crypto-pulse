import { ITransformedCoinsMarketData } from "../dataTypes/TransformedCoinsMarketData.interface";


export interface ICoinsState {
  coins: ITransformedCoinsMarketData[];
  setCoins: (coins: ITransformedCoinsMarketData[]) => void;
}