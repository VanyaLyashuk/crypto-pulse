import { FC } from "react";
import { useShallow } from "zustand/react/shallow";
import useCoinInfoStore from "../../store/coinInfo.store";
import CoinInfoFilter from "../coinInfoFilter/CoinInfoFilter";

const CoinInfoFilters: FC = () => {
  const { selectedMetric, selectedTimeRange } = useCoinInfoStore(
    useShallow((state) => ({
      selectedMetric: state.selectedMetric,
      selectedTimeRange: state.selectedTimeRange,
    }))
  );
  return (
    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
      <CoinInfoFilter
        filterOptions={["Price", "Market Cap"]}
        activeFilter={selectedMetric}
      />
      <CoinInfoFilter
        filterOptions={["24h", "7d", "1m", "3m", "1y", "date range"]}
        activeFilter={selectedTimeRange}
      />
    </div>
  );
};

export default CoinInfoFilters;
