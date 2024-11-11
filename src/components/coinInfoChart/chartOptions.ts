import { ChartOptions } from "chart.js";
import { formatCurrencyValue, formatDate } from "../../utils/CryptoTableUtils";

export const getChartOptions = (
  selectedYAxisLabels: string[],
  selectedData: [number, number][],
  total_volumes: [number, number][],
  selectedMetric: string,
  label: string,
  gridColor: string
): ChartOptions<"line"> => ({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      type: "time",
      time: {
        displayFormats: {
          year: "MMM yy",
        },
      },
      grid: {
        display: true,
        drawOnChartArea: false,
        color: gridColor,
        lineWidth: 1,
        z: 1,
      },
      ticks: {
        autoSkip: true,
        maxTicksLimit: 12,
        color: label,
      },
    },
    y: {
      position: "right",
      grid: {
        display: true,
        drawOnChartArea: true,
        drawTicks: false,
        color: (context) => {
          if (context.index === 0) {
            return "transparent";
          }
          return gridColor;
        },
        lineWidth: 1,
        z: 0,
      },
      ticks: {
        callback: function (_value: any, index: number) {
          return selectedYAxisLabels[index] || "";
        },
        maxTicksLimit: selectedYAxisLabels.length,
        color: label,
      },
      border: {
        display: false,
      },
      suggestedMin: Math.min(...selectedData.map(([, value]) => value)),
      suggestedMax: Math.max(...selectedData.map(([, value]) => value)),
    },
  },
  plugins: {
    tooltip: {
      displayColors: false,
      callbacks: {
        title: (tooltipItems) => {
          const timestamp = selectedData[tooltipItems[0].dataIndex][0];
          return formatDate(timestamp, true);
        },
        label: (tooltipItem) => {
          const price = selectedData[tooltipItem.dataIndex][1];
          const volume = total_volumes[tooltipItem.dataIndex][1];

          return [
            `${selectedMetric}: ${formatCurrencyValue(price, "$")}`,
            `Volume: ${formatCurrencyValue(volume, "$")}`,
          ];
        },
      },
    },
    legend: {
      display: false,
    },
  },
  interaction: {
    intersect: false,
    mode: "index",
  },
  elements: {
    point: {
      radius: 0,
    },
  },
});
