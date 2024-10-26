import { useLocation, useNavigate } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import useCoinInfoStore from "../store/coinInfo.store";
import { calcStartDate } from "../utils/CryptoTableUtils";

const useCoinInfoModal = () => {
  const { selectedTimeRange, setStartDate, setEndDate } = useCoinInfoStore(
    useShallow((state) => ({
      selectedTimeRange: state.selectedTimeRange,
      setStartDate: state.setStartDate,
      setEndDate: state.setEndDate,
    }))
  );

  const navigate = useNavigate();
  const location = useLocation();

  const openModal = (id: string) => {
    const backgroundLocation = { pathname: location.pathname };
    navigate(`/coin/${id}`, { state: { backgroundLocation } });

    const endDate = new Date();
    const startDate = calcStartDate(selectedTimeRange, endDate);

    setStartDate(startDate);
    setEndDate(endDate);
  };

  return { openModal };
};

export default useCoinInfoModal;
