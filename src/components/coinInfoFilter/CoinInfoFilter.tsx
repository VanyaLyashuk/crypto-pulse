import clsx from "clsx";
import { BsCalendar2 } from "react-icons/bs";
import { ICoinInfoFilterProps } from "../../models";

const CoinInfoFilter: React.FC<ICoinInfoFilterProps> = ({
  filterOptions,
  activeFilter,
  onFilterChange,
}) => {
  const buttons = filterOptions.map((filter) => {
    const btnClasses = clsx("px-2 py-1 text-sm font-medium", {
      "bg-white rounded-md shadow-sm": activeFilter === filter,
      "px-1 mx-1": activeFilter === "date range",
    });

    return filter === "date range" ? (
      <button
        key={filter}
        className={btnClasses}
        onClick={() => onFilterChange(filter)}
      >
        <BsCalendar2 />
      </button>
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
