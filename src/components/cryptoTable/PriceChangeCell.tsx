import clsx from "clsx";
import { ITransformedPriceChange } from "../../models";
import { formatPercentageValue } from "../../utils/CryptoTableUtils";
import ArrowIcon from "../UI/ArrowIcon";

const PriceChangeCell: React.FC<ITransformedPriceChange> = ({ value }) => {
  const isNegative: boolean = value < 0;
  const cellClasses = clsx("flex items-center justify-end gap-0.5", {
    "text-red-600": value && isNegative,
    "text-green-500": value && !isNegative,
    "text-gray-700": !value,
  });

  return (
    <div className={cellClasses}>
      {value ? <ArrowIcon isNegative={isNegative} /> : null}
      <span>{formatPercentageValue(value)}</span>
    </div>
  );
};

export default PriceChangeCell;
