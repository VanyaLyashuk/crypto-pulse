export interface ICoinInfoHeaderProps {
  name: string;
  symbol: string;
  image: string;
  market_cap_rank: number;
  current_price_formatted: string;
  price_change_percentage_24h_in_currency: number;
}