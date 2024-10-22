import clsx from "clsx";
import { IPriceChangeIndicatorProps } from "../../models";
import { formatPercentageValue } from "../../utils/CryptoTableUtils";
import ArrowIcon from "../UI/ArrowIcon";

const PriceChangeIndicator: React.FC<IPriceChangeIndicatorProps> = ({
  arrowSize,
  className,
  value,
  alignment = 'end'
}) => {
  const isNegative: boolean = value < 0;
  const containerClasses = clsx("flex items-center gap-0.5", {
    "text-red-600": value && isNegative,
    "text-green-500": value && !isNegative,
    "text-primary-text": !value,
    "justify-end": alignment === 'end',
    "justify-center": alignment === 'center',
  });

  return (
    <div className={containerClasses}>
      {value ? (
        <ArrowIcon arrowSize={arrowSize} isNegative={isNegative} />
      ) : null}
      <span className={className}>{formatPercentageValue(value)}</span>
    </div>
  );
};

export default PriceChangeIndicator;
