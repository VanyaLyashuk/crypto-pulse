import clsx from "clsx";
import { BsCalendar2 } from "react-icons/bs";
import { ICoinInfoFilterProps } from "../../models";
import CoinInfoDatepicker from "../coinInfoDatePicker/CoinInfoDatePicker";

const CoinInfoFilter: React.FC<ICoinInfoFilterProps> = ({
  filterOptions,
  activeFilter,
  onFilterChange,
  startDate,
  endDate,
  isOpen,
  handleDateChange,
  toggleDatepicker,
}) => {
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
            toggleDatepicker ? toggleDatepicker() : null;
          }}
        >
          <BsCalendar2 className="w-4 h-5"/>
        </button>
        {isOpen && (
          <CoinInfoDatepicker
            handleDateChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
          />
        )}
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
