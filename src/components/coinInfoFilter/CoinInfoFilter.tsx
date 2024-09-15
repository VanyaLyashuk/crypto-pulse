import clsx from "clsx";
import { BsCalendar2 } from "react-icons/bs";
import { useShallow } from "zustand/react/shallow";
import {
  ICoinInfoFilterProps,
  TCoinInfoMetric,
  TCoinInfoTimeRange,
} from "../../models";
import useCoinInfoStore from "../../store/coinInfo.store";
import { calcEndDate } from "../../utils/CryptoTableUtils";
import CoinInfoDatepicker from "../coinInfoDatePicker/CoinInfoDatePicker";

const CoinInfoFilter: React.FC<ICoinInfoFilterProps> = ({
  filterOptions,
  activeFilter,
}) => {
  const {
    isDatepickerOpen,
    setIsDatepickerOpen,
    setSelectedMetric,
    setSelectedTimeRange,
    startDate,
    setEndDate,
  } = useCoinInfoStore(
    useShallow((state) => ({
      isDatepickerOpen: state.isDatepickerOpen,
      setIsDatepickerOpen: state.setIsDatepickerOpen,
      setSelectedMetric: state.setSelectedMetric,
      setSelectedTimeRange: state.setSelectedTimeRange,
      startDate: state.startDate,
      setEndDate: state.setEndDate,
    }))
  );

  const onFilterChange = (filter: TCoinInfoMetric | TCoinInfoTimeRange) => {
    const isMetric = filter === "Price" || filter === "Market Cap";
    const isDateRange = filter === "date range";

    if (isMetric) {
      setSelectedMetric(filter);
    } else {
      setSelectedTimeRange(filter);
      const endDate = calcEndDate(startDate, filter);
      setEndDate(endDate);
    }
    setIsDatepickerOpen(isDateRange);
  };

  const buttons = filterOptions.map((filter) => {
    const btnClasses = clsx("px-2 py-1 text-sm font-medium", {
      "bg-white rounded-md shadow-sm": activeFilter === filter,
    });

    return filter === "date range" ? (
      <div className="relative inline-block" key={filter}>
        <button
          className={btnClasses}
          onClick={() => {
            onFilterChange(filter);
            setIsDatepickerOpen(!isDatepickerOpen);
          }}
        >
          <BsCalendar2 className="w-4 h-5" />
        </button>
        {isDatepickerOpen && <CoinInfoDatepicker />}
      </div>
    ) : (
      <button
        key={filter}
        className={btnClasses}
        onClick={() => onFilterChange(filter)}
      >
        {filter}
      </button>
    );
  });

  return (
    <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-md">
      {buttons}
    </div>
  );
};

export default CoinInfoFilter;
