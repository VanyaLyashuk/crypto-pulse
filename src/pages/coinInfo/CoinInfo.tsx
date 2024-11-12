import CoinInfoTable from "../../components/coinInfoTable/CoinInfoTable";

import { motion } from "framer-motion";
import { useShallow } from "zustand/react/shallow";
import CoinInfoChart from "../../components/coinInfoChart/CoinInfoChart";
import CoinInfoChartSkeleton from "../../components/coinInfoChartSkeleton/CoinInfoChartSkeleton";
import CoinInfoList from "../../components/coinInfoList/CoinInfoList";
import ErrorBoundary from "../../components/errorBoundary/ErrorBoundary";
import SpinnerIcon from "../../components/UI/SpinnerIcon";
import useCoinInfoData from "../../hooks/useCoinInfoData";

import CoinInfoClose from "../../components/coinInfoClose/CoinInfoClose";
import CoinInfoFilters from "../../components/coinInfoFilters/CoinInfoFilters";
import CoinInfoHeader from "../../components/coinInfoHeader/CoinInfoHeader";
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
        transition={{ ease: "easeIn" }}
        onDragEnd={() => {
          if (y.get() >= 100) closeModal();
        }}
        drag="y"
        dragControls={controls}
        dragListener={false}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.5 }}
        className="absolute bottom-0 h-[85vh] overflow-hidden w-full bg-primary-bg rounded-tl-xl rounded-tr-xl md:overflow-visible md:py-9 md:relative md:h-auto md:rounded-xl md:max-w-full  md:m-auto md:px-4 lg:px-6 xl:max-w-[1300px] "
      >
        <CoinInfoClose
          closeModal={closeModal}
          onPointerDown={(e) => {
            controls.start(e);
          }}
        />
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
              <CoinInfoHeader
                name={name}
                image={image}
                symbol={symbol}
                market_cap_rank={market_cap_rank}
                current_price_formatted={current_price_formatted}
                price_change_percentage_24h_in_currency={
                  price_change_percentage_24h_in_currency
                }
              />
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
