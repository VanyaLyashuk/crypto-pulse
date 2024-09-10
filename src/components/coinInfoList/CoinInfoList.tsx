import clsx from "clsx";
import { ICoinInfoListProps } from "../../models";
import CoinInfoListItem from "../coinInfoListItem/CoinInfoListItem";

const CoinInfoList: React.FC<ICoinInfoListProps> = ({ name, title, data }) => {
  const wrapperClasses = clsx("lg:col-span-4", {
    "mb-6 lg:mb-0 lg:col-span-4": title === "Statistics",
  });

  const listItems = data
    ? Object.entries(data).map(([key, value]) => (
        <CoinInfoListItem key={key} value={value} />
      ))
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
