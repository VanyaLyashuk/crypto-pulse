import { ICoinInfoFilterProps } from "../../models";
import CoinInfoFilterButton from "../coinInfoFilterButton/CoinInfoFilterButton";

const CoinInfoFilter: React.FC<ICoinInfoFilterProps> = ({
  filterOptions,
  activeFilter,
}) => {
  const buttons = filterOptions.map((filter) => (
    <CoinInfoFilterButton filter={filter} activeFilter={activeFilter} />
  ));

  return (
    <div className="flex items-center gap-[2px] sm:gap-1 p-1.5 bg-filter-bg rounded-md md:rounded-lg">
      {buttons}
    </div>
  );
};

export default CoinInfoFilter;
