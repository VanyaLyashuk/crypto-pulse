import { TCryptoTableCurrency } from "../models";
import { convertScientificToStandard } from "../utils/CoinGeckoServiceUtils";
import { formatCurrencyValue } from "../utils/CryptoTableUtils";

const useFormattedSmallCurrency = (
  value: number | null | undefined,
  currency?: TCryptoTableCurrency,
  options?: Intl.NumberFormatOptions
): JSX.Element | string => {
  if (value === null || value === undefined) {
    return "-";
  }

  const formattedValue = convertScientificToStandard(value);

  if (value >= 1) {
    return formatCurrencyValue(value, currency, options);
  }

  if (value < 1 && value > 0) {
    const [integerPart, fractionalPart] = formattedValue.split(".");
    const leadingZeros = fractionalPart.match(/^0+/)?.[0].length || 0;
    const significantDigits = fractionalPart.slice(
      leadingZeros,
      leadingZeros + 4
    );

    return leadingZeros > 3 ? (
      <span>
        {currency}
        {integerPart}.0
        <span className="text-xs align-bottom">{leadingZeros}</span>
        {significantDigits}
      </span>
    ) : (
      <span>{formatCurrencyValue(value, currency, options)}</span>
    );
  }

  return "-";
};

export default useFormattedSmallCurrency;
