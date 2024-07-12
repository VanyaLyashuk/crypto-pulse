import clsx from "clsx";
import React from "react";

import { ITransformedPriceChange } from "../../models";
import ArrowIcon from "../UI/ArrowIcon";

const PriceChangeCell: React.FC<ITransformedPriceChange> = ({
  value,
  isNegative,
}) => {
  const cellClasses = clsx("flex items-center justify-end gap-0.5", {
    "text-red-600": isNegative,
    "text-green-500": !isNegative,
  });

  return (
    <div className={cellClasses}>
      <ArrowIcon isNegative={isNegative} />
      <span>{value}</span>
    </div>
  );
};ƒ

export default PriceChangeCell;
