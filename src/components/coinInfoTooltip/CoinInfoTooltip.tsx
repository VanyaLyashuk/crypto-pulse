import clsx from "clsx";
import { FC, useState } from "react";
import { PiInfo } from "react-icons/pi";

const CoinInfoTooltip: FC<{ date: string }> = ({ date }) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(false);

  const tooltipClasses = clsx(
    "absolute top-1/2 translate-y-[-50%] left-[22px] bg-primary-bg text-xs shadow-md p-2 rounded-md text-nowrap",
    {
      "opacity-0 hidden": !isTooltipOpen,
    },
    {
      "opacity-1 visible": isTooltipOpen,
    }
  );
  return (
    <div className="relative cursor-pointer" onClick={() => setIsTooltipOpen(!isTooltipOpen)}>
      <PiInfo className="relative top-[1px]" />
      <div className={tooltipClasses}>{date}</div>
    </div>
  );
};

export default CoinInfoTooltip;
