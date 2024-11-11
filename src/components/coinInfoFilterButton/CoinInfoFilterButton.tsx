import clsx from "clsx";
import { FC } from "react";
import { BsCalendar2 } from "react-icons/bs";
import { useShallow } from "zustand/react/shallow";

import useFilterHandler from "../../hooks/useFilterHandler";
import { ICoinInfoFilterButtonProps } from "../../models";
import useCoinInfoStore from "../../store/coinInfo.store";
import CoinInfoDatepicker from "../coinInfoDatePicker/CoinInfoDatePicker";

const CoinInfoFilterButton: FC<ICoinInfoFilterButtonProps> = ({
  filter,
  activeFilter,
}) => {
  const { isDatepickerOpen, setIsDatepickerOpen } = useCoinInfoStore(
    useShallow((state) => ({
      isDatepickerOpen: state.isDatepickerOpen,
      setIsDatepickerOpen: state.setIsDatepickerOpen,
    }))
  );
  const { handleFilterChange } = useFilterHandler();

  const btnClasses = clsx("px-1.5 py-1 sm:px-2 sm:py-1.5 text-sm font-medium", {
    "bg-primary-bg rounded-md shadow-sm ": activeFilter === filter,
  });

  const handleClick = () => {
    handleFilterChange(filter);
    if (filter === "date range") {
      setIsDatepickerOpen(!isDatepickerOpen);
    } else {
      setIsDatepickerOpen(false);
    }
  };

  return (
    <>
      <button className={btnClasses} onClick={handleClick}>
        {filter === "date range" ? (
          <BsCalendar2 className="w-4 h-4 sm:h-5" />
        ) : (
          filter
        )}
      </button>
      {filter === "date range" && isDatepickerOpen && <CoinInfoDatepicker />}
    </>
  );
};

export default CoinInfoFilterButton;
