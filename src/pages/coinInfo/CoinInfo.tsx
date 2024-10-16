import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CoinInfoTable from "../../components/coinInfoTable/CoinInfoTable";
import PriceChangeIndicator from "../../components/priceChangeIndicator/PriceChangeIndicator";

import { useShallow } from "zustand/react/shallow";
import CoinInfoChart from "../../components/coinInfoChart/CoinInfoChart";
import CoinInfoChartSkeleton from "../../components/coinInfoChartSkeleton/CoinInfoChartSkeleton";
import CoinInfoFilter from "../../components/coinInfoFilter/CoinInfoFilter";
import CoinInfoList from "../../components/coinInfoList/CoinInfoList";
import ErrorBoundary from "../../components/errorBoundary/ErrorBoundary";
import { TCoinInfoChartData, TCoinInfoTimeRange } from "../../models";
import CoinGeckoService from "../../services/CoinGeckoService";
import useCoinInfoStore from "../../store/coinInfo.store";
import useCoinsStore from "../../store/coins.store";
import { getUnixTimestamp } from "../../utils/CryptoTableUtils";

const CoinInfo: React.FC = () => {
  const { coinId } = useParams<{ coinId: string }>();
  const [chartData, setChartData] = useState<
    TCoinInfoChartData | Record<TCoinInfoTimeRange, any>
  >({});

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const {
    selectedCoinId,
    setSelectedCoinId,
    selectedMetric,
    setSelectedMetric,
    selectedTimeRange,
    setSelectedTimeRange,
    startDate,
    endDate,
  } = useCoinInfoStore(
    useShallow((state) => ({
      selectedCoinId: state.selectedCoinId,
      setSelectedCoinId: state.setSelectedCoinId,
      selectedMetric: state.selectedMetric,
      setSelectedMetric: state.setSelectedMetric,
      selectedTimeRange: state.selectedTimeRange,
      setSelectedTimeRange: state.setSelectedTimeRange,
      startDate: state.startDate,
      endDate: state.endDate,
    }))
  );

  const {
    name,
    symbol,
    image,
    market_cap_rank,
    current_price_formatted,
    price_change_percentage_24h_in_currency,
    coin_statistics,
    coin_historical_price,
    coin_percentage_table,
  } = useCoinsStore(
    (state) => state.coins.filter((coin) => coin.id === selectedCoinId)[0] || {}
  );

  const coinGecoService = new CoinGeckoService();

  const navigate = useNavigate();
  const closeModal = () => {
    navigate(-1);
    setSelectedMetric("Price");
    setSelectedTimeRange("24h");
  };

  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => document.body.classList.remove("overflow-hidden");
  }, []);

  useEffect(() => {
    if (!selectedCoinId && coinId) {
      setSelectedCoinId(coinId);
    }
  }, [coinId, selectedCoinId]);

  useEffect(() => {
    if (endDate && selectedCoinId) {
      onRequest(selectedTimeRange);
    }
  }, [endDate, selectedCoinId]);

  const onRequest = (period: TCoinInfoTimeRange) => {
    if (hasDataForPeriod(period)) {
      setChartData({
        ...chartData,
        ["date range"]: chartData[period],
      });
      return;
    }

    onLoading();

    const from = getUnixTimestamp(startDate);
    const to = getUnixTimestamp(endDate);

    coinGecoService
      ._getCoinHistoricalChartDataById(selectedCoinId, from, to)
      .then((data) => {
        const newChartData = {
          ...chartData,
          [period]: data,
          ["date range"]: data,
        };

        setChartData(newChartData);

        setLoading(false);
        setError(false);
      })
      .catch((e) => {
        onError();
      });
  };

  const hasDataForPeriod = (period: TCoinInfoTimeRange): boolean => {
    return chartData[period] && period !== "date range";
  };

  const onLoading = () => {
    setLoading(true);
    setError(false);
  };

  const onError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <div
      onClick={closeModal}
      className="fixed inset-0 z-50 pt-6 overflow-y-scroll bg-black bg-opacity-50 sm:justify-end sm:flex sm:p-6 sm:items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full px-2 py-9 bg-white rounded-tl-xl rounded-tr-xl sm:rounded-xl sm:max-w-full  sm:m-auto sm:px-4 lg:px-6 xl:max-w-[1300px] xl:flex xl:items-start xl:gap-6"
      >
        <div className="w-full xl:order-2">
          <div className="mb-3 md:mb-5">
            <div className="flex flex-wrap items-start justify-between gap-2 mb-2.5">
              <CoinInfoFilter
                filterOptions={["Price", "Market Cap"]}
                activeFilter={selectedMetric}
              />
              <CoinInfoFilter
                filterOptions={["24h", "7d", "1m", "3m", "1y", "date range"]}
                activeFilter={selectedTimeRange}
              />
            </div>
            {!loading && !error && chartData[selectedTimeRange] ? (
              <ErrorBoundary>
                <CoinInfoChart data={chartData[selectedTimeRange]} />
              </ErrorBoundary>
            ) : (
              <CoinInfoChartSkeleton />
            )}
          </div>
          <div className="mb-6 overflow-x-auto border rounded-lg md:hidden xl:block xl:mb-0">
            <CoinInfoTable data={coin_percentage_table} />
          </div>
        </div>
        <div className="xl:shrink-0 xl:w-max xl:order-1">
          <div className="w-full mb-5 md:flex md:gap-4">
            <div className="md:w-max">
              <div className="flex items-center gap-2 mb-2">
                <img className="w-8" src={image} alt={name} />
                <h3 className="text-2xl font-bold leading-none">
                  <span className="break-normal">{name}</span>&nbsp;
                  <span className="text-base font-normal text-nowrap">
                    <span className="uppercase">{symbol}</span> Price
                  </span>
                </h3>
                <div className="px-2 py-1 text-sm font-normal bg-gray-200 rounded-md">
                  #{market_cap_rank}
                </div>
              </div>
              <div className="flex items-center gap-x-2">
                <h4 className="text-4xl font-bold">
                  {current_price_formatted}
                </h4>
                <PriceChangeIndicator
                  arrowSize="w-4 h-4"
                  className="text-xl font-bold"
                  value={price_change_percentage_24h_in_currency}
                />
              </div>
            </div>
            <div className="hidden w-full overflow-x-auto border rounded-lg md:block md:order-1 md:flex-grow lg:overflow-auto xl:hidden">
              <CoinInfoTable data={coin_percentage_table} />
            </div>
          </div>
          <div className="flex flex-col w-full gap-y-6 md:mt-6 md:flex-row md:gap-4 md:order-none lg:gap-6 xl:flex-col xl:mt-0">
            <CoinInfoList
              name={symbol}
              title="Statistics"
              data={coin_statistics}
            />
            <CoinInfoList
              name={symbol}
              title="Historical Price"
              data={coin_historical_price}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinInfo;
