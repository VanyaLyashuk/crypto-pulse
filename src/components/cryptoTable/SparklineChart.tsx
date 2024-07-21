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

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const SparklineChart: React.FC<ISparklineChartProps> = ({ price }) => {
  const labels = price.map((_, index) => index.toString());

  const isPriceIncreasing = price[price.length - 1] >= price[0];

  const chartData = {
    labels,
    datasets: [
      {
        data: price,
        borderColor: isPriceIncreasing ? "rgb(34, 197, 94)" : "rgb(220, 38, 38)",
        backgroundColor: "rgba(0, 0, 0, 0)",
        borderWidth: 1,
        pointRadius: 0,
      }
    ]
  }

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
        tension: 0.3
      },
    },
  };

  return (
    <div className="w-[135px] h-[50px]">
      <Line data={chartData} options={options}></Line>
    </div>
  );
};

export default SparklineChart;
