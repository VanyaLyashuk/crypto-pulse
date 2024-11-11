export const COLORS = {
  darkGrid: "rgba(55, 65, 81, 1)",
  lightGrid: "rgb(229, 231, 235)",
  darkLine: "rgba(55, 65, 81, 1)",
  lightLine: "rgb(229, 231, 235)",
  red: "rgba(220, 38, 38, 1)",
  green: "rgba(34, 197, 94, 1)",
  label: "rgb(107, 114, 128)",
};

export const getThemeColors = (isDarkTheme: boolean | undefined) => {
  const { darkGrid, lightGrid, darkLine, lightLine, red, green, label } =
    COLORS;

  return {
    gridColor: isDarkTheme ? darkGrid : lightGrid,
    lineColor: isDarkTheme ? darkLine : lightLine,
    red,
    green,
    label,
  };
};
