import { FC, useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import { useShallow } from "zustand/react/shallow";

import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  TimeScale,
  Title,
  Tooltip,
} from "chart.js";
import "chartjs-adapter-date-fns";

import { verticalLinePlugin } from "./VerticalLinePlugin";

import CoinInfoChartSkeleton from "../coinInfoChartSkeleton/CoinInfoChartSkeleton";
import { getThemeColors } from "./chartConfig";
import { getChartOptions } from "./chartOptions";

import { ICoinInfoChartProps } from "../../models";
import useCoinInfoStore from "../../store/coinInfo.store";

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

const CoinInfoChart: FC<ICoinInfoChartProps> = ({ data }) => {
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
  const { gridColor, red, green, label } = getThemeColors(isDarkTheme);

  useEffect(() => {
    if (!chartRef.current) return;

    const chartCanvas = chartRef.current.ctx;
    if (!chartCanvas) return;

    const gradient = chartCanvas.createLinearGradient(0, 0, 0, 500);
    const chartColor = (
      selectedData[0][1] > selectedData[selectedData.length - 1][1]
        ? red
        : green
    ).slice(0, -2);

    gradient.addColorStop(0, `${chartColor} 0.5)`);
    gradient.addColorStop(1, `${chartColor} 0)`);

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
            ? red
            : green,
        backgroundColor: backgroundColor,
        borderWidth: 2,
        fill: true,
        pointRadius: 0,
        pointHitRadius: 10,
      },
    ],
  };

  const options = getChartOptions(
    selectedYAxisLabels,
    selectedData,
    total_volumes,
    selectedMetric,
    label,
    gridColor
  );

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
