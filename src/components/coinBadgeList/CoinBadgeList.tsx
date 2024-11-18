import { FC } from "react";
import { ICoinBadgeListProps } from "../../models";
import CoinBadge from "../CoinBadge/CoinBadge";

const CoinBadgeList: FC<ICoinBadgeListProps> = ({ data }) => {
  return (
    <ul className="flex flex-wrap justify-center w-full gap-1.5 py-2 rounded-md sm:gap-2">
      {data.map((coin, index) => (
        <CoinBadge key={coin.id} {...coin} index={index} />
      ))}
    </ul>
  );
};

export default CoinBadgeList;
