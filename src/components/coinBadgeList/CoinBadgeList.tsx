import { FC } from "react";
import { ICoinBadgeListProps } from "../../models";
import CoinBadge from "../CoinBadge/CoinBadge";

const CoinBadgeList: FC<ICoinBadgeListProps> = ({ data }) => {
  return (
    <ul className="flex flex-wrap justify-center w-full gap-2 py-2 mb-2 rounded-md">
      {data.map((coin, index) => (
        <CoinBadge key={coin.id} {...coin} index={index} />
      ))}
    </ul>
  );
};

export default CoinBadgeList;
