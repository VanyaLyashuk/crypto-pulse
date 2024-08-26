import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bitcoin from "../../assets/bitcoin.png";
import CoinInfoTable from "../../components/coinInfoTable/CoinInfoTable";
import PriceChangeIndicator from "../../components/priceChangeIndicator/PriceChangeIndicator";

import CoinInfoFilter from "../../components/coinInfoFilter/CoinInfoFilter";
import CoinInfoList from "../../components/coinInfoList/CoinInfoList";
import {
  ICoinInfoProps,
  TCoinInfoMetric,
  TCoinInfoTimeRange,
  TDateChangeHandler,
} from "../../models";
import { ICoinStatisticsData } from "../../models/dataTypes/CoinStatisticsData.interface";
import { IHistoricalPriceData } from "../../models/dataTypes/HistoricalPriceData.interface";

const CoinInfo: React.FC<ICoinInfoProps> = ({ id }) => {
  const [selectedMetric, setSelectedMetric] =
    useState<TCoinInfoMetric>("Price");
  const [selectedTimeRange, setSelectedTimeRange] =
    useState<TCoinInfoTimeRange>("24h");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const coinInfoTableData = [
    {
      label: "1h",
      value: 0.1,
    },
    {
      label: "24h",
      value: 0.5,
    },
    {
      label: "7d",
      value: 4.7,
    },
    {
      label: "14d",
      value: 0.6,
    },
    {
      label: "30d",
      value: -7.9,
    },
    {
      label: "1y",
      value: 134.8,
    },
  ];

  const coinStatisticsData: ICoinStatisticsData = {
    market_cap: {
      label: "Market Cap",
      price: "$1,171,509,139,974",
    },
    fully_diluted_valuation: {
      label: "Fully Diluted Valuation",
      price: "$1,241,366,511,000",
    },
    "24h_trading_volume": {
      label: "24 Hour Trading Vol",
      price: "$28,002,457,100",
    },
    circulating_supply: {
      label: "Circulating Supply",
      price: "19,742,937",
    },
    total_supply: {
      label: "Total Supply",
      price: "21,000,000",
    },
    max_supply: {
      label: "Max Supply",
      price: "21,000,000",
    },
  };

  const historicalPriceListData: IHistoricalPriceData = {
    "24h_range": {
      label: "24h Range",
      price: "$58,985.75 – $61,830.21",
    },
    "7d_range": {
      label: "7d Range",
      price: "$56,765.93 – $61,524.47",
    },
    all_time_high: {
      label: "All-Time High",
      price: "$73,737.94",
      price_change_percentage: -17.4,
      date: "date",
    },
    all_time_low: {
      label: "All-Time Low",
      price: "$67.81",
      price_change_percentage: 89757.9,
      date: "date",
    },
  };

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
              filterOptions={[
                "24h",
                "7d",
                "1m",
                "3m",
                "1y",
                "MAX",
                "date range",
              ]}
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
            <p>Coin chart for {id}</p>
          </div>
        </div>
        <div className="lg:grid lg:grid-rows-[auto, auto, 1fr] lg:grid-cols-8 lg:gap-6">
          <div className="w-full mb-8 overflow-x-scroll border rounded-lg lg:col-span-5 lg:col-start-4 lg:row-start-1 lg:mb-0 lg:self-start lg:overflow-auto">
            <CoinInfoTable data={coinInfoTableData} />
          </div>
          <div className="mb-5 lg:col-span-3 lg:mb-0">
            <div className="flex items-center gap-2 mb-3">
              <img className="w-8" src={bitcoin} alt={id} />
              <h3 className="text-2xl font-bold">
                Bitcoin <span className="text-base font-normal">BTC Price</span>
              </h3>
              <div className="px-2 py-1 text-sm font-normal bg-gray-200 rounded-md">
                #1
              </div>
            </div>
            <div className="flex items-center gap-x-2">
              <h4 className="text-4xl font-bold">$59,464.31</h4>
              <PriceChangeIndicator
                arrowSize="w-4 h-4"
                className="text-xl font-bold"
                value={2.3}
              />
            </div>
          </div>
          <CoinInfoList
            name="Bitcoin"
            title="Statistics"
            data={coinStatisticsData}
          />
          <CoinInfoList
            name="BTC"
            title="Historical Price"
            data={historicalPriceListData}
          />
        </div>
      </div>
    </div>
  );
};

export default CoinInfo;
