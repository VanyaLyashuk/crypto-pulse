import { FC } from "react";
import { ICoinInfoHeaderProps } from "../../models";
import PriceChangeIndicator from "../priceChangeIndicator/PriceChangeIndicator";

const CoinInfoHeader: FC<ICoinInfoHeaderProps> = ({
  name,
  image,
  symbol,
  market_cap_rank,
  current_price_formatted,
  price_change_percentage_24h_in_currency,
}) => {
  return (
    <div className="w-full md:w-max shrink-0">
      <div className="flex items-center gap-2 mb-2">
        <img className="w-8 shrink-0" src={image} alt={name} />
        <h3 className="text-2xl font-bold leading-none md:max-w-[300px]">
          <span className="break-normal">{name}</span>&nbsp;
          <span className="text-base font-normal text-nowrap">
            <span className="uppercase">{symbol}</span> Price
          </span>
        </h3>
        <div className="px-2 py-1 text-sm font-normal rounded-md bg-filter-bg shrink-0">
          #{market_cap_rank}
        </div>
      </div>
      <div className="flex items-center gap-x-2">
        <h4 className="text-4xl font-bold">{current_price_formatted}</h4>
        <PriceChangeIndicator
          arrowSize="w-4 h-4"
          className="text-xl font-bold"
          value={price_change_percentage_24h_in_currency ?? 0}
        />
      </div>
    </div>
  );
};

export default CoinInfoHeader;
