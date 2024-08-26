import clsx from "clsx";
import { PiInfo } from "react-icons/pi";
import { ICoinInfoListProps } from "../../models";
import PriceChangeIndicator from "../priceChangeIndicator/PriceChangeIndicator";

const CoinInfoList: React.FC<ICoinInfoListProps> = ({ name, title, data }) => {
  const wrapperClasses = clsx("lg:col-span-4", {
    "mb-6 lg:mb-0 lg:col-span-4": title === "Statistics",
  });

  const liClasses =
    "flex items-start justify-between py-3 font-medium border-b last:border-b-0 last:pb-0";

  const listItems = data
    ? Object.entries(data).map(([key, data]) => {
        return key === "all_time_high" || key === "all_time_low" ? (
          <li key={key} className={liClasses}>
            <div className="flex items-center gap-1">
              <h5 className="text-gray-500">{data.label}</h5>{" "}
              <PiInfo className="relative top-[1px]" />
            </div>
            <div className="flex items-center justify-end font-medium gap-x-2">
              <h4>{data.price}</h4>
              <PriceChangeIndicator
                arrowSize="w-2 h-2"
                value={data.price_change_percentage}
              />
            </div>
          </li>
        ) : (
          <li key={key} className={liClasses}>
            <h5 className="text-gray-500">{data.label}</h5>{" "}
            <div>{data.price}</div>
          </li>
        );
      })
    : null;

  return (
    <div className={wrapperClasses}>
      <h5 className="text-2xl font-bold ">
        {name} {title}
      </h5>
      <ul>{listItems}</ul>
    </div>
  );
};

export default CoinInfoList;
