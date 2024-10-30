import { useHttp } from "../hooks/useHttp";
import {
  ICoinHistoricalChartDataById,
  ICoinsListData,
  ICoinsMarketData,
  ISearchCoinData,
  ISearchCoinResult,
  ITransformedCoinsMarketData,
} from "../models";
import {
  transformCoinHistoricalChartDataById,
  transformCoinsListWithMarketData,
} from "../utils/CoinGeckoServiceUtils";

const useCoinGeckoService = () => {
  const { loading, request, error } = useHttp();

  const getCoinsListWithMarketData = async (
    perPage: number = 30,
    page: number = 1,
    id?: string
  ): Promise<ITransformedCoinsMarketData[]> => {
    const endpoint = `/coins/markets`;
    const params = `vs_currency=usd${id ? "&ids=" + id : ""}&per_page=${perPage}&page=${page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C1y&precision=2`;
    
    const data = await request<ICoinsMarketData[]>(endpoint, params);
    return transformCoinsListWithMarketData(data);
  };

  const getCoinHistoricalChartDataById = async (
    id: string,
    from: number,
    to: number
  ): Promise<ICoinHistoricalChartDataById> => {
    const endpoint = `/coins/${id}/market_chart/range`;
    const params = `vs_currency=usd&from=${from}&to=${to}`;
    
    const data = await request<ICoinHistoricalChartDataById>(endpoint, params);
    return transformCoinHistoricalChartDataById(data);
  };

  const getCoinsListLength = async (): Promise<number> => {
    const endpoint = `/coins/list`;
    const params = ``;
    
    const data = await request<ICoinsListData[]>(endpoint, params);
    return data.length;
  };

  const searchCoin = async (query: string): Promise<ISearchCoinResult[]> => {
    const endpoint = `/search`;
    const params = `query=${query}`;
    
    const data = await request<ISearchCoinData>(endpoint, params);
    return data.coins;
  };

  return {
    loading,
    error,
    getCoinsListWithMarketData,
    getCoinHistoricalChartDataById,
    getCoinsListLength,
    searchCoin,
  };
};

export default useCoinGeckoService;
