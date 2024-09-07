import clsx from "clsx";
import { PiInfo } from "react-icons/pi";
import { ICoinInfoListProps } from "../../models";
import PriceChangeIndicator from "../priceChangeIndicator/PriceChangeIndicator";

const CoinInfoList: React.FC<ICoinInfoListProps> = ({ name, title, data }) => {
  const wrapperClasses = clsx("lg:col-span-4", {
    "mb-6 lg:mb-0 lg:col-span-4": title === "Statistics",
  });

  const liClasses = "flex items-start justify-between py-3 font-medium border-b last:border-b-0 last:pb-0";

  const listItems = data
    ? Object.entries(data).map(([key, value]) => {
        if ('percentage' in value) {
          return (
            <li key={key} className={liClasses}>
              <div className="flex items-center gap-1">
                <h5 className="text-gray-500">{value.label}</h5>{" "}
                <PiInfo className="relative top-[1px]" />
              </div>
              <div className="flex items-center justify-end font-medium gap-x-2">
                <h4>{value.price}</h4>
                <PriceChangeIndicator arrowSize="w-2 h-2" value={value.percentage} />
              </div>
            </li>
          );
        } else {
          return (
            <li key={key} className={liClasses}>
              <h5 className="text-gray-500">{value.label}</h5>{" "}
              <div>{value.price}</div>
            </li>
          );
        }
      })
    : null;

  return (
    <div className={wrapperClasses}>
      <h5 className="text-2xl font-bold ">
        <span className="uppercase">{name}</span> {title}
      </h5>
      <ul>{listItems}</ul>
    </div>
  );
};

export default CoinInfoList;
