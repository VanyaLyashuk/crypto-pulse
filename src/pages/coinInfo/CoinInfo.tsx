import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CoinInfoTable from "../../components/coinInfoTable/CoinInfoTable";
import PriceChangeIndicator from "../../components/priceChangeIndicator/PriceChangeIndicator";

import CoinInfoFilter from "../../components/coinInfoFilter/CoinInfoFilter";
import CoinInfoList from "../../components/coinInfoList/CoinInfoList";
import {
  TCoinInfoMetric,
  TCoinInfoTimeRange,
  TDateChangeHandler,
} from "../../models";
import useCoinInfoStore from "../../store/coinInfo.store";

const CoinInfo: React.FC = () => {
  const [selectedMetric, setSelectedMetric] =
    useState<TCoinInfoMetric>("Price");
  const [selectedTimeRange, setSelectedTimeRange] =
    useState<TCoinInfoTimeRange>("24h");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const coin = useCoinInfoStore((state) => state.selectedCoin);

  const navigate = useNavigate();
  const closeModal = () => navigate(-1);

  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => document.body.classList.remove("overflow-hidden");
  }, []);

  const handleInnerClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const handleFilterChange = useCallback(
    (filter: TCoinInfoMetric | TCoinInfoTimeRange) => {
      const isMetric = filter === "Price" || filter === "Market Cap";
      const isDateRange = filter === "date range";

      if (isMetric) {
        setSelectedMetric(filter);
      } else {
        setSelectedTimeRange(filter);
      }

      setIsOpen(isDateRange);
    },
    []
  );

  const toggleDatepicker = () => setIsOpen(!isOpen);

  const handleDateChange: TDateChangeHandler = (dates) => {
    if (dates) {
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);
    }
  };

  const {
    name,
    symbol,
    image,
    market_cap_rank,
    market_cap_formatted,
    fully_diluted_valuation,
    trading_volume_24h,
    circulating_supply,
    total_supply,
    max_supply,
    current_price_formatted,
    price_change_percentage_1h_in_currency,
    price_change_percentage_24h_in_currency,
    price_change_percentage_7d_in_currency,
    price_change_percentage_14d_in_currency,
    price_change_percentage_30d_in_currency,
    price_change_percentage_1y_in_currency,
    range_24h,
    range_7d,
    ath,
    atl,
  } = coin;

  return (
    <div
      onClick={closeModal}
      className="fixed inset-0 z-50 pt-6 overflow-y-scroll bg-black bg-opacity-50 sm:justify-end sm:flex sm:p-6 sm:items-center"
    >
      <div
        onClick={handleInnerClick}
        className="w-full px-2 py-9 bg-white rounded-tl-xl rounded-tr-xl sm:rounded-xl sm:max-w-[592px]  md:max-w-[720px] lg:max-w-[976px] sm:m-auto sm:px-4 lg:px-6"
      >
        <div className="mb-2 lg:mb-8">
          <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
            <CoinInfoFilter
              filterOptions={["Price", "Market Cap"]}
              activeFilter={selectedMetric}
              onFilterChange={handleFilterChange}
            />
            <CoinInfoFilter
              filterOptions={["24h", "7d", "1m", "3m", "1y", "date range"]}
              activeFilter={selectedTimeRange}
              onFilterChange={handleFilterChange}
              startDate={startDate}
              endDate={endDate}
              isOpen={isOpen}
              handleDateChange={handleDateChange}
              toggleDatepicker={toggleDatepicker}
            />
          </div>
          <div className="grid w-full bg-gray-200 aspect-video place-items-center">
            <p>Coin chart for {name}</p>
          </div>
        </div>
        <div className="lg:grid lg:grid-rows-[auto, auto, 1fr] lg:grid-cols-8 lg:gap-6">
          <div className="w-full mb-8 overflow-x-scroll border rounded-lg lg:col-span-5 lg:col-start-4 lg:row-start-1 lg:mb-0 lg:self-start lg:overflow-auto">
            <CoinInfoTable
              data={[
                { label: "1h", value: price_change_percentage_1h_in_currency },
                {
                  label: "24h",
                  value: price_change_percentage_24h_in_currency,
                },
                { label: "7d", value: price_change_percentage_7d_in_currency },
                {
                  label: "14d",
                  value: price_change_percentage_14d_in_currency,
                },
                {
                  label: "30d",
                  value: price_change_percentage_30d_in_currency,
                },
                { label: "1y", value: price_change_percentage_1y_in_currency },
              ]}
            />
          </div>
          <div className="mb-5 lg:col-span-3 lg:mb-0">
            <div className="flex items-center gap-2 mb-3">
              <img className="w-8" src={image} alt={name} />
              <h3 className="text-2xl font-bold leading-none">
                {name}{" "}
                <span className="text-base font-normal text-nowrap">
                  <span className="uppercase">{symbol}</span> Price
                </span>
              </h3>
              <div className="px-2 py-1 text-sm font-normal bg-gray-200 rounded-md">
                #{market_cap_rank}
              </div>
            </div>
            <div className="flex items-center gap-x-2">
              <h4 className="text-4xl font-bold">{current_price_formatted}</h4>
              <PriceChangeIndicator
                arrowSize="w-4 h-4"
                className="text-xl font-bold"
                value={price_change_percentage_24h_in_currency}
              />
            </div>
          </div>
          <CoinInfoList
            name={symbol}
            title="Statistics"
            data={{
              market_cap_formatted,
              fully_diluted_valuation,
              trading_volume_24h,
              circulating_supply,
              total_supply,
              max_supply,
            }}
          />
          <CoinInfoList
            name={symbol}
            title="Historical Price"
            data={{ range_24h, range_7d, ath, atl }}
          />
        </div>
      </div>
    </div>
  );
};

export default CoinInfo;
