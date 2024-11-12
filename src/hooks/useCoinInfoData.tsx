import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import {
  ITransformedCoinsMarketData,
  TCoinInfoChartData,
  TCoinInfoTimeRange,
} from "../models";
import useCoinGeckoService from "../services/CoinGeckoService";
import useCoinInfoStore from "../store/coinInfo.store";
import { getUnixTimestamp } from "../utils/CryptoTableUtils";

const useCoinInfoData = () => {
  const [coin, setCoin] = useState<ITransformedCoinsMarketData | null>(null);
  const [chartData, setChartData] = useState<
    TCoinInfoChartData | Record<TCoinInfoTimeRange, any>
  >({});
  const { coinId } = useParams<{ coinId: string }>();

  const {selectedTimeRange, startDate, endDate } =
    useCoinInfoStore(
      useShallow((state) => ({
        selectedTimeRange: state.selectedTimeRange,
        startDate: state.startDate,
        endDate: state.endDate,
      }))
    );

  const {
    loading,
    error,
    getCoinsListWithMarketData,
    getCoinHistoricalChartDataById,
  } = useCoinGeckoService();

  useEffect(() => {
    onCoinDataRequest();
  }, []);

  useEffect(() => {
    if (endDate && coinId) {
      onHistoricalDataRequest(selectedTimeRange);
    }
  }, [endDate, coinId]);

  const onCoinDataRequest = () => {
    getCoinsListWithMarketData(30, 1, coinId).then((data) => {
      setCoin(data[0]);
    });
  };

  const onHistoricalDataRequest = (period: TCoinInfoTimeRange) => {
    if (hasDataForPeriod(period)) {
      setChartData({
        ...chartData,
        ["date range"]: chartData[period],
      });
      return;
    }

    const from = getUnixTimestamp(startDate);
    const to = getUnixTimestamp(endDate);

    getCoinHistoricalChartDataById(coinId as string, from, to).then((data) => {
      const newChartData = {
        ...chartData,
        [period]: data,
        ["date range"]: data,
      };

      setChartData(newChartData);
    });
  };

  const hasDataForPeriod = (period: TCoinInfoTimeRange): boolean => {
    return chartData[period] && period !== "date range";
  };

  return {coin, chartData, loading, error};
};

export default useCoinInfoData;
