import {
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  Plugin,
  PointElement,
  TimeScale,
  Title,
  Tooltip,
} from "chart.js";
import "chartjs-adapter-date-fns";

import React, { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import { useShallow } from "zustand/react/shallow";
import { ITransformedCoinHistoricalChartDataById } from "../../models";
import useCoinInfoStore from "../../store/coinInfo.store";
import { formatCurrencyValue, formatDate } from "../../utils/CryptoTableUtils";
import CoinInfoChartSkeleton from "../coinInfoChartSkeleton/CoinInfoChartSkeleton";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  Filler
);

interface CoinInfoChartProps {
  data: ITransformedCoinHistoricalChartDataById;
}

const verticalLinePlugin: Plugin = {
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
      const lineColor = isDarkTheme
        ? "rgba(55, 65, 81, 1)"
        : "rgb(229, 231, 235)";

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

const CoinInfoChart: React.FC<CoinInfoChartProps> = ({ data }) => {
  const chartRef = useRef<ChartJS<"line">>(null);
  const [backgroundColor, setBackgroundColor] = useState<
    string | CanvasGradient
  >("");

  const {
    prices,
    market_caps,
    total_volumes,
    yAxisLabelsPrice,
    yAxisLabelsMarketCap,
  } = data;

  const { selectedMetric } = useCoinInfoStore(
    useShallow((state) => ({
      selectedMetric: state.selectedMetric,
    }))
  );

  const selectedData = selectedMetric === "Price" ? prices : market_caps;
  const selectedYAxisLabels =
    selectedMetric === "Price" ? yAxisLabelsPrice : yAxisLabelsMarketCap;

  const isDarkTheme = document
    .querySelector("html")
    ?.classList.contains("dark");
  const gridColor = isDarkTheme
    ? "rgba(55, 65, 81, 1)"
    : "rgb(229, 231, 235)";
  const labelColor = "rgb(107, 114, 128)";

  useEffect(() => {
    if (!chartRef.current) return;

    const chartCanvas = chartRef.current.ctx;
    if (!chartCanvas) return;

    const gradient = chartCanvas.createLinearGradient(0, 0, 0, 500);
    const chartColor =
      selectedData[0][1] > selectedData[selectedData.length - 1][1]
        ? "rgba(220, 38, 38, 1)"
        : "rgba(34, 197, 94, 1)";

    if (chartColor === "rgba(220, 38, 38, 1)") {
      gradient.addColorStop(0, "rgba(220, 38, 38, 0.5)");
      gradient.addColorStop(1, "rgba(220, 38, 38, 0)");
    } else {
      gradient.addColorStop(0, "rgba(34, 197, 94, 0.5)");
      gradient.addColorStop(1, "rgba(34, 197, 94, 0)");
    }

    setBackgroundColor(gradient);
  }, [selectedData]);

  if (!selectedData.length || !market_caps.length) {
    return <CoinInfoChartSkeleton message="No data available" />;
  }

  const chartData = {
    labels: selectedData.map(([timestamp]) => timestamp),
    datasets: [
      {
        label: "Price",
        data: selectedData.map(([, value]) => value),
        borderColor:
          selectedData[0][1] > selectedData[selectedData.length - 1][1]
            ? "rgba(220, 38, 38, 1)"
            : "rgba(34, 197, 94, 1)",
        backgroundColor: backgroundColor,
        borderWidth: 2,
        fill: true,
        pointRadius: 0,
        pointHitRadius: 10,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
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
          color: labelColor,
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
          color: labelColor,
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
            const formattedDate = formatDate(timestamp, true);
            return `${formattedDate}`;
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
  };

  return (
    <div className="relative w-full h-[500px]">
      <Line
        ref={chartRef}
        data={chartData}
        options={options}
        plugins={[verticalLinePlugin]}
      />
    </div>
  );
};

export default CoinInfoChart;
