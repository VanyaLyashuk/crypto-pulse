import useFormattedSmallCurrency from "../../hooks/useFormattedSmallCurrency";
import { ICoinListItemProps } from "../../models";
import CoinInfoTooltip from "../coinInfoTooltip/CoinInfoTooltip";
import PriceChangeIndicator from "../priceChangeIndicator/PriceChangeIndicator";

const CoinInfoListItem: React.FC<ICoinListItemProps> = ({ value }) => {
  const liClasses =
    "flex items-start justify-between py-3 font-medium border-b border-b-delimeter-color last:border-b-0 last:pb-0";

  const { label, price } = value;

  const formattedPrice =
    typeof price === "number" ? (
      useFormattedSmallCurrency(price, "$")
    ) : Array.isArray(price) ? (
      <div>
        {useFormattedSmallCurrency(price[0], "$")}-
        {useFormattedSmallCurrency(price[1], "$")}
      </div>
    ) : (
      <div>{price}</div>
    );

  if ("percentage" in value) {
    const { percentage, date } = value;

    return (
      <li className={liClasses}>
        <div className="flex items-center gap-1 text-secondary-text">
          <h5 className="">{label}</h5>
          <CoinInfoTooltip date={date} />
        </div>
        <div className="flex items-center justify-end font-medium gap-x-2">
          <h4>{formattedPrice}</h4>
          <PriceChangeIndicator arrowSize="w-2 h-2" value={percentage} />
        </div>
      </li>
    );
  }

  return (
    <li className={liClasses}>
      <h5 className="mr-2 text-secondary-text lg:mr-4">{label}</h5>
      {formattedPrice}
    </li>
  );
};

export default CoinInfoListItem;
