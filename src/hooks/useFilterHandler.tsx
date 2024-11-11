import debounce from "debounce";
import { useShallow } from "zustand/react/shallow";

import { TCoinInfoMetric, TCoinInfoTimeRange } from "../models";
import useCoinInfoStore from "../store/coinInfo.store";
import { calcStartDate } from "../utils/CryptoTableUtils";

const useFilterHandler = () => {
  const {
    setSelectedMetric,
    setSelectedTimeRange,
    startDate,
    setStartDate,
    setEndDate,
  } = useCoinInfoStore(
    useShallow((state) => ({
      setSelectedMetric: state.setSelectedMetric,
      startDate: state.startDate,
      setSelectedTimeRange: state.setSelectedTimeRange,
      setStartDate: state.setStartDate,
      setEndDate: state.setEndDate,
    }))
  );

  const handleFilterChange = debounce(
    (filter: TCoinInfoMetric | TCoinInfoTimeRange) => {
      const isMetric = filter === "Price" || filter === "Market Cap";
      const isDateRange = filter === "date range";

      if (isMetric) {
        setSelectedMetric(filter);
      } else {
        setSelectedTimeRange(filter);

        if (startDate && !isDateRange) {
          const endDate = new Date();
          const startDate = calcStartDate(filter, endDate);
          setStartDate(startDate);
          setEndDate(endDate);
        }
      }
    },
    100
  );
  return { handleFilterChange };
};

export default useFilterHandler;
