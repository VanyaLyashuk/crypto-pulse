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

  const _apiKey: string = import.meta.env.VITE_COINGECKO_API_KEY;
  const _apiBase: string = "https://api.coingecko.com/api/v3/";
  const _vsCurrency: string = "usd";

  const getCoinsListWithMarketData = async (
    vsCurrency: string = _vsCurrency,
    perPage: number = 30,
    page: number = 1,
    id?: string
  ): Promise<ITransformedCoinsMarketData[]> => {
    const url = `${_apiBase}coins/markets?vs_currency=${vsCurrency}${
      id ? "&ids=" + id : ""
    }&per_page=${perPage}&page=${page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C1y&precision=2&x_cg_demo_api_key=${_apiKey}`;
    const data = await request<ICoinsMarketData[]>(url, {});
    const transformedData = transformCoinsListWithMarketData(data);

    return transformedData;
  };

  const getCoinHistoricalChartDataById = async (
    id: string,
    from: number,
    to: number,
    vsCurrency: string = _vsCurrency
  ): Promise<ICoinHistoricalChartDataById> => {
    const url = `${_apiBase}coins/${id}/market_chart/range?vs_currency=${vsCurrency}&from=${from}&to=${to}&x_cg_demo_api_key=${_apiKey}`;
    const data = await request<ICoinHistoricalChartDataById>(url, {});
    const labeledData = transformCoinHistoricalChartDataById(data);

    return labeledData;
  };

  const getCoinsListLength = async (): Promise<number> => {
    const url = `${_apiBase}coins/list?x_cg_demo_api_key=${_apiKey}`;
    const data = await request<ICoinsListData[]>(url, {});

    return data.length;
  };

  const searchCoin = async (query: string): Promise<ISearchCoinResult[]> => {
    const url = `${_apiBase}search?query=${query}&x_cg_demo_api_key=${_apiKey}`;
    const data = await request<ISearchCoinData>(url, {});
    
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
