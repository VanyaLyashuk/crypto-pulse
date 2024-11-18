import { FC } from "react";
import { ICoinBadgeListProps } from "../../models";
import CoinBadge from "../CoinBadge/CoinBadge";

const CoinBadgeList: FC<ICoinBadgeListProps> = ({ data }) => {
  return (
    <ul className="flex flex-wrap justify-center w-full gap-2 mb-8 rounded-md md:mb-10 lg:mb-12">
      {data.map((coin, index) => (
        <CoinBadge key={coin.id} {...coin} index={index} />
      ))}
    </ul>
  );
};

export default CoinBadgeList;
