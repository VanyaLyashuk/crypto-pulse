import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
} from "chart.js";
import React from "react";
import { Line } from "react-chartjs-2";
import { ISparklineChartProps } from "../../models";
import { CHART_COLORS } from "../../utils/CryptoTableUtils";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      display: false,
    },
    y: {
      display: false,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  elements: {
    line: {
      tension: 0.3,
    },
    point: {
      radius: 0,
      hoverRadius: 0,
    },
  },
};

const CryptoTableSparklineChart: React.FC<ISparklineChartProps> = ({
  price,
}) => {
  const isEmpty = price.length === 0;
  const labels = price.map((_, index) => index.toString());

  const isPriceIncreasing = price[price.length - 1] >= price[0];

  const { red, green } = CHART_COLORS;

  const chartData = {
    labels,
    datasets: [
      {
        data: price,
        borderColor: isPriceIncreasing ? green : red,
        borderWidth: 1,
        pointRadius: 0,
      },
    ],
  };

  return (
    <div className="w-[135px] h-[50px] flex items-center justify-end">
      {isEmpty ? "-" : <Line data={chartData} options={options}></Line>}
    </div>
  );
};

export default CryptoTableSparklineChart;
