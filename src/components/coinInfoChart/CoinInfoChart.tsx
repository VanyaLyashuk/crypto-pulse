import {
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LinearScale,
  LineElement,
  Plugin,
  PointElement,
  TimeScale,
  Title,
  Tooltip,
} from "chart.js";

import React, { useRef } from "react";
import { Line } from "react-chartjs-2";
import { ITransformedCoinHistoricalChartDataById } from "../../models";
import { formatCurrencyValue, formatDate } from "../../utils/CryptoTableUtils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
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

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x, topY);
      ctx.lineTo(x, bottomY);
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(0, 0, 0, 0.2)";
      ctx.stroke();
      ctx.restore();
    }
  },
};

const CoinInfoChart: React.FC<CoinInfoChartProps> = ({ data }) => {
  const chartRef = useRef<ChartJS<"line">>(null);
  const { prices, total_volumes, xAxisLabels, yAxisLabels } = data;

  const chartData = {
    labels: prices.map(([timestamp]) => timestamp),
    datasets: [
      {
        label: "Price",
        data: prices.map(([, value]) => value),
        borderColor:
          prices[0][1] > prices[prices.length - 1][1]
            ? "rgba(220, 38, 38, 1)"
            : "rgba(34, 197, 94, 1)",
        borderWidth: 2,
        fill: false,
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
        grid: {
          display: true,
          drawOnChartArea: false,
          color: "rgba(211,211,211,0.5)",
          lineWidth: 1,
          z: 1,
        },
        ticks: {
          callback: function (index: any) {
            const labelIndex = Math.floor(
              (index / prices.length) * xAxisLabels.length
            );
            return xAxisLabels[labelIndex] || "";
          },
          autoSkip: true,
          maxTicksLimit: 10,
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
            return "rgba(211,211,211,0.5)";
          },
          lineWidth: 1,
          z: 1,
        },
        ticks: {
          callback: function (_value: any, index: number) {
            return yAxisLabels[index] || "";
          },
          maxTicksLimit: yAxisLabels.length,
          padding: 14,
        },
        border: {
          display: false,
        },
        suggestedMin: Math.min(...prices.map(([, value]) => value)),
        suggestedMax: Math.max(...prices.map(([, value]) => value)),
      },
    },
    plugins: {
      tooltip: {
        displayColors: false,
        callbacks: {
          title: (tooltipItems) => {
            const timestamp = prices[tooltipItems[0].dataIndex][0];
            const formattedDate = formatDate(timestamp, true);
            return `${formattedDate}`;
          },

          label: (tooltipItem) => {
            const price = prices[tooltipItem.dataIndex][1];
            const volume = total_volumes[tooltipItem.dataIndex][1];

            return [
              `Price: ${formatCurrencyValue(price, "$")}`,
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
