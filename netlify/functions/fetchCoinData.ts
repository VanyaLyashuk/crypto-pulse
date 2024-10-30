import { Handler } from "@netlify/functions";
import fetch from "node-fetch";

interface FetchEvent {
  endpoint: string;
  params: string;
}

export const handler: Handler = async (event) => {
  const { endpoint, params } = JSON.parse(event.body || "{}") as FetchEvent;

  const url = `https://api.coingecko.com/api/v3${endpoint}?${params}&x_cg_demo_api_key=${process.env.VITE_COINGECKO_API_KEY}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: response.statusText }),
      };
    }

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch data from CoinGecko" }),
    };
  }
};
