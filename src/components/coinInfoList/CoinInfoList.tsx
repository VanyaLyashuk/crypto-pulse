import { ICoinInfoListProps } from "../../models";
import CoinInfoListItem from "../coinInfoListItem/CoinInfoListItem";

const CoinInfoList: React.FC<ICoinInfoListProps> = ({ name, title, data }) => {

  const listItems = data
    ? Object.entries(data).map(([key, value]) => (
        <CoinInfoListItem key={key} value={value} />
      ))
    : null;

  return (
    <div className="w-full">
      <h5 className="text-2xl font-bold ">
        <span className="uppercase">{name}</span> {title}
      </h5>
      <ul>{listItems}</ul>
    </div>
  );
};

export default CoinInfoList;
