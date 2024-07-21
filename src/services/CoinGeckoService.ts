import {
  ICoinHistoricalChartData,
  ICoinsMarketData,
  ICoinWithHistoricalData,
  ITransformedCoinHistoricalChartData,
  ITransformedCoinsMarketData
} from "../models";
import {
  transformCoinHistoricalChartData,
  transformCoinsListWithMarketData,
} from "./CoinGeckoServiceUtils";

class CoinGeckoService {
  private readonly _apiKey: string = import.meta.env.VITE_COINGECKO_API_KEY;
  private readonly _apiBase: string = "https://api.coingecko.com/api/v3/";
  private readonly _vsCurrency: string = "usd";
  private readonly _perPage: number = 30;
  private readonly _historicalChartDays: number = 7;
  private readonly _historicalChartInterval: string = "daily";

  private async getResource<T>(url: string): Promise<T> {
    const options = {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        accept: "application/json",
        "x-cg-demo-api-key": this._apiKey || "",
      },
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, status: ${response.status}`);
    }

    return (await response.json()) as T;
  }

  public async _getCoinsListWithMarketData(
    vsCurrency: string = this._vsCurrency,
    perPage: number = this._perPage
  ): Promise<ITransformedCoinsMarketData[]> {
    const url = `${this._apiBase}coins/markets?vs_currency=${vsCurrency}&per_page=${perPage}&price_change_percentage=1h%2C24h%2C7d&precision=2`;

    const data = await this.getResource<ICoinsMarketData[]>(url);
    const transformedData = transformCoinsListWithMarketData(data);

    return transformedData;
  }

  public async _getCoinHistoricalChartDataById(
    id: string,
    vsCurrency: string = this._vsCurrency,
    days: number = this._historicalChartDays,
    interval: string = this._historicalChartInterval,
  ): Promise<ITransformedCoinHistoricalChartData> {
    const url = `${this._apiBase}coins/${id}/market_chart?vs_currency=${vsCurrency}&days=${days}&interval=${interval}`;
    const data = await this.getResource<ICoinHistoricalChartData>(url);
    const transformedData = transformCoinHistoricalChartData(data);

    return transformedData;
  }

  public async _getCoinsListWithHistoricalData(
    vsCurrency: string = this._vsCurrency,
    perPage: number = this._perPage,
    days: number = this._historicalChartDays,
    interval: string = this._historicalChartInterval
  ): Promise<ICoinWithHistoricalData[]> {
    const coinsMarketData = await this._getCoinsListWithMarketData(vsCurrency, perPage);

    const coinsWithHistoricalData = await Promise.all(
      coinsMarketData.map(async (coin) => {
        const historicalData = await this._getCoinHistoricalChartDataById(coin.id, vsCurrency, days, interval);

        return {
          ...coin,
          historicalPriceData: historicalData.prices
        } as ICoinWithHistoricalData;
      })
    );

    return coinsWithHistoricalData;
  }
}

export default CoinGeckoService;
