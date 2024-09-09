import clsx from "clsx";
import { useState } from "react";
import { PiInfo } from "react-icons/pi";
import { ICoinListItemProps } from "../models";
import PriceChangeIndicator from "./priceChangeIndicator/PriceChangeIndicator";

const CoinInfoListItem: React.FC<ICoinListItemProps> = ({value}) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(false);

  const tooltipClasses = clsx(
    "absolute top-1/2 translate-y-[-50%] left-[22px] bg-white text-xs shadow-md p-2 rounded-md text-nowrap",
    {
      "opacity-0 hidden": !isTooltipOpen,
    },
    {
      "opacity-1 visible": isTooltipOpen,
    }
  );

  const liClasses =
    "flex items-start justify-between py-3 font-medium border-b last:border-b-0 last:pb-0";

  if ("percentage" in value) {
    return (
      <li className={liClasses}>
        <div
          onClick={() => setIsTooltipOpen(!isTooltipOpen)}
          className="flex items-center gap-1 text-gray-500 cursor-pointer"
        >
          <h5 className="">{value.label}</h5>{" "}
          <div className="relative">
            <PiInfo className="relative top-[1px]" />
            <div className={tooltipClasses}>{value.date}</div>
          </div>
        </div>
        <div className="flex items-center justify-end font-medium gap-x-2">
          <h4>{value.price}</h4>
          <PriceChangeIndicator arrowSize="w-2 h-2" value={value.percentage} />
        </div>
      </li>
    );
  } else {
    return (
      <li className={liClasses}>
        <h5 className="text-gray-500">{value.label}</h5>{" "}
        <div>{value.price}</div>
      </li>
    );
  }
};

export default CoinInfoListItem;
