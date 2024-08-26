import { useCallback, useEffect, useState } from "react";
import { PiInfo } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import bitcoin from "../../assets/bitcoin.png";
import CoinInfoTable from "../../components/coinInfoTable/CoinInfoTable";
import PriceChangeIndicator from "../../components/priceChangeIndicator/PriceChangeIndicator";

import CoinInfoFilter from "../../components/coinInfoFilter/CoinInfoFilter";
import {
  ICoinInfoProps,
  TCoinInfoMetric,
  TCoinInfoTimeRange,
  TDateChangeHandler,
} from "../../models";

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
          <div className="mb-6 lg:mb-0 lg:col-span-4">
            <h5 className="text-2xl font-bold ">Bitcoin Statistics</h5>
            <ul>
              <li className="flex justify-between py-3 font-medium border-b">
                <h5 className="text-gray-500">Market Cap</h5>{" "}
                <div>$1,171,509,139,974</div>
              </li>
              <li className="flex justify-between py-3 font-medium border-b">
                <h5 className="text-gray-500">Fully Diluted Valuation</h5>{" "}
                <div>$1,241,366,511,000</div>
              </li>
              <li className="flex justify-between py-3 font-medium border-b">
                <h5 className="text-gray-500">24 Hour Trading Vol</h5>{" "}
                <div>$28,002,457,100</div>
              </li>
              <li className="flex justify-between py-3 font-medium border-b">
                <h5 className="text-gray-500">Circulating Supply</h5>{" "}
                <div>19,742,937</div>
              </li>
              <li className="flex justify-between py-3 font-medium border-b">
                <h5 className="text-gray-500">Total Supply</h5>{" "}
                <div>21,000,000</div>
              </li>
              <li className="flex justify-between pt-3">
                <h5 className="text-gray-500">Max Supply</h5>{" "}
                <div>21,000,000</div>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-4">
            <h5 className="text-2xl font-bold">BTC Historical Price</h5>
            <ul>
              <li className="flex justify-between py-3 font-medium border-b">
                <h5 className="text-gray-500">24h Range</h5>{" "}
                <div>$58,985.75 – $61,830.21</div>
              </li>
              <li className="flex justify-between py-3 font-medium border-b">
                <h5 className="text-gray-500">7d Range</h5>{" "}
                <div>$56,765.93 – $61,524.47</div>
              </li>
              <li className="flex items-start justify-between py-3 font-medium border-b">
                <div className="flex items-center gap-1">
                  <h5 className="text-gray-500 ">All-Time High</h5>{" "}
                  <PiInfo className="relative top-[1px]" />
                </div>
                <div className="flex items-center justify-end font-medium gap-x-2">
                  <h4>$73,737.94</h4>
                  <PriceChangeIndicator arrowSize="w-2 h-2" value={-17.4} />
                </div>
              </li>
              <li className="flex items-start justify-between pt-3 font-medium">
                <div className="flex items-center gap-1">
                  <h5 className="text-gray-500">All-Time Low</h5>{" "}
                  <PiInfo className="relative top-[1px]" />
                </div>
                <div className="flex items-center justify-end font-medium gap-x-2">
                  <h4>$67.81</h4>
                  <PriceChangeIndicator arrowSize="w-2 h-2" value={89757.9} />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinInfo;
