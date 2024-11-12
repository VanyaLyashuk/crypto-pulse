import { CHART_COLORS } from "../../utils/CryptoTableUtils";

export const getThemeColors = (isDarkTheme: boolean | undefined) => {
  const { darkGrid, lightGrid, darkLine, lightLine, red, green, label } =
    CHART_COLORS;

  return {
    gridColor: isDarkTheme ? darkGrid : lightGrid,
    lineColor: isDarkTheme ? darkLine : lightLine,
    red,
    green,
    label,
  };
};
