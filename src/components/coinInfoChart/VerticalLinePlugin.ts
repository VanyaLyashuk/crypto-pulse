import { Plugin } from "chart.js";
import { getThemeColors } from "./chartConfig";

export const verticalLinePlugin: Plugin = {
  id: "verticalLine",
  afterDraw: (chart) => {
    const activeElements = (chart.tooltip as any)?._active;
    if (activeElements?.length) {
      const ctx = chart.ctx;
      const x = activeElements[0].element.x;
      const topY = chart.scales.y.top;
      const bottomY = chart.scales.y.bottom;
      const isDarkTheme = document
        .querySelector("html")
        ?.classList.contains("dark");
      const { lineColor } = getThemeColors(isDarkTheme);

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x, topY);
      ctx.lineTo(x, bottomY);
      ctx.lineWidth = 1;
      ctx.strokeStyle = lineColor;
      ctx.stroke();
      ctx.restore();
    }
  },
};
