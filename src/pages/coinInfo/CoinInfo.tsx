import CoinInfoTable from "../../components/coinInfoTable/CoinInfoTable";
import PriceChangeIndicator from "../../components/priceChangeIndicator/PriceChangeIndicator";

import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { useShallow } from "zustand/react/shallow";
import CoinInfoChart from "../../components/coinInfoChart/CoinInfoChart";
import CoinInfoChartSkeleton from "../../components/coinInfoChartSkeleton/CoinInfoChartSkeleton";
import CoinInfoFilter from "../../components/coinInfoFilter/CoinInfoFilter";
import CoinInfoList from "../../components/coinInfoList/CoinInfoList";
import ErrorBoundary from "../../components/errorBoundary/ErrorBoundary";
import SpinnerIcon from "../../components/UI/SpinnerIcon";
import useCoinInfoData from "../../hooks/useCoinInfoData";

import CoinInfoFilters from "../../components/coinInfoFilters/CoinInfoFilters";
import useCoinInfoModal from "../../hooks/useCoinInfoModal";
import { ICoinStatisticsData } from "../../models/dataTypes/CoinStatisticsData.interface";
import { IHistoricalPriceData } from "../../models/dataTypes/HistoricalPriceData.interface";
import useCoinInfoStore from "../../store/coinInfo.store";

const CoinInfo: React.FC = () => {
  const { coin, chartData, loading, error } = useCoinInfoData();
  const { closeModal, scope, controls, modalBodyRef, y } = useCoinInfoModal();

  const { selectedTimeRange } = useCoinInfoStore(
    useShallow((state) => ({
      selectedTimeRange: state.selectedTimeRange,
    }))
  );

  if (!coin) return <SpinnerIcon />;

  const {
    name = "",
    symbol = "",
    image = "",
    market_cap_rank,
    current_price_formatted = "",
    price_change_percentage_24h_in_currency,
    coin_statistics = [],
    coin_historical_price = [],
    coin_percentage_table = [],
  } = coin ?? {};

  const chart =
    !loading && !error && chartData[selectedTimeRange] ? (
      <ErrorBoundary>
        <CoinInfoChart data={chartData[selectedTimeRange]} />
      </ErrorBoundary>
    ) : (
      <CoinInfoChartSkeleton />
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={closeModal}
      ref={scope}
      className="fixed inset-0 z-50 bg-black bg-opacity-50 md:overflow-y-scroll md:justify-end md:flex md:px-6 md:py-10 md:items-center xl:overflow-hidden"
    >
      <motion.div
        ref={modalBodyRef}
        id="modal-body"
        onClick={(e) => e.stopPropagation()}
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        style={{ y }}
        transition={{
          ease: "easeIn",
        }}
        onDragEnd={() => {
          if (y.get() >= 100) closeModal();
        }}
        drag="y"
        dragControls={controls}
        dragListener={false}
        dragConstraints={{
          top: 0,
          bottom: 0,
        }}
        dragElastic={{
          top: 0,
          bottom: 0.5,
        }}
        className="absolute bottom-0 h-[85vh] overflow-hidden w-full bg-primary-bg rounded-tl-xl rounded-tr-xl md:overflow-visible md:py-9 md:relative md:h-auto md:rounded-xl md:max-w-full  md:m-auto md:px-4 lg:px-6 xl:max-w-[1300px] "
      >
        <div
          onPointerDown={(e) => {
            controls.start(e);
          }}
          className="absolute top-0 left-0 right-0 z-10 flex justify-center py-5 bg-primary-bg  md:bg-transparent md:top-[-38px] md:right-[-16px] md:p-2 md:left-auto md:z-[100] md:cursor-pointer"
        >
          <button className="hidden md:block" onClick={closeModal}>
            <IoClose className="w-8 h-8 text-cross-color" />
          </button>
          <button className="w-20 h-1.5 rounded cursor-grab touch-none-full bg-neutral-600 active:cursor-grabbing md:hidden" />
        </div>
        <div className="relative z-0 w-full h-full px-2 pt-12 overflow-y-auto md:overflow-hidden pb-9 sm:px-4 md:p-0 xl:flex xl:items-start xl:gap-6">
          <div className="w-full xl:order-2">
            <div className="mb-4 md:mb-5">
              <CoinInfoFilters />
              {chart}
            </div>
            <div className="mb-6 overflow-x-auto border rounded-lg border-border-color md:hidden xl:block xl:mb-0">
              <CoinInfoTable data={coin_percentage_table} />
            </div>
          </div>
          <div className="xl:shrink-0 xl:max-w-[400px] xl:order-1">
            <div className="w-full mb-5 md:flex md:gap-4">
              <div className="w-full md:w-max shrink-0">
                <div className="flex items-center gap-2 mb-2">
                  <img className="w-8 shrink-0" src={image} alt={name} />
                  <h3 className="text-2xl font-bold leading-none md:max-w-[300px]">
                    <span className="break-normal">{name}</span>&nbsp;
                    <span className="text-base font-normal text-nowrap">
                      <span className="uppercase">{symbol}</span> Price
                    </span>
                  </h3>
                  <div className="px-2 py-1 text-sm font-normal rounded-md bg-filter-bg shrink-0">
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
                    value={price_change_percentage_24h_in_currency ?? 0}
                  />
                </div>
              </div>
              <div className="hidden w-full overflow-x-auto border rounded-lg border-border-color md:block md:order-1 md:flex-grow lg:overflow-auto xl:hidden">
                <CoinInfoTable data={coin_percentage_table} />
              </div>
            </div>
            <div className="flex flex-col w-full gap-y-6 md:mt-6 md:flex-row md:gap-4 md:order-none lg:gap-6 xl:flex-col xl:mt-0">
              <CoinInfoList
                name={symbol}
                title="Statistics"
                data={coin_statistics as ICoinStatisticsData}
              />
              <CoinInfoList
                name={symbol}
                title="Historical Price"
                data={coin_historical_price as IHistoricalPriceData}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CoinInfo;
