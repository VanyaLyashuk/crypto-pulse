import { ICoinsMarketData, ITransformedCoinsMarketData } from "../models";
import { transformCoinsListWithMarketData } from "./CoinGeckoServiceUtils";

class CoinGeckoService {
  private readonly _apiBase: string = "https://api.coingecko.com/api/v3/";
  private readonly _apiKey: string = import.meta.env.VITE_COINGECKO_API_KEY;
  private readonly _vsCurrency: string = "usd";
  private readonly _perPage: number = 50;

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
}

export default CoinGeckoService;
