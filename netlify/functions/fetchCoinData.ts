import { Handler } from "@netlify/functions";

interface FetchEvent {
  endpoint: string;
  params: string;
}

export const handler: Handler = async (event) => {
  const { endpoint, params } = JSON.parse(event.body || "{}") as FetchEvent;
  const apiKey = process.env.COINGECKO_API_KEY;

  const url = `https://api.coingecko.com/api/v3${endpoint}?${params}&x_cg_demo_api_key=${apiKey}`;
  console.log(url)
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
    console.error("Error fetching data:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch data from CoinGecko" }),
    };
  }
};
