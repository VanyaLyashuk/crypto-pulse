import { useAnimate, useDragControls, useMotionValue } from "framer-motion";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useMeasure from "react-use-measure";
import { useShallow } from "zustand/react/shallow";
import useCoinInfoStore from "../store/coinInfo.store";
import { calcStartDate } from "../utils/CryptoTableUtils";

const useCoinInfoModal = () => {
  const { selectedTimeRange, setStartDate, setEndDate, setIsDatepickerOpen } =
    useCoinInfoStore(
      useShallow((state) => ({
        selectedTimeRange: state.selectedTimeRange,
        setStartDate: state.setStartDate,
        setEndDate: state.setEndDate,
        setIsDatepickerOpen: state.setIsDatepickerOpen,
      }))
    );

  const navigate = useNavigate();
  const location = useLocation();

  const [scope, animate] = useAnimate();
  const [modalBodyRef, { height }] = useMeasure();
  const controls = useDragControls();
  const y = useMotionValue(0);

  const openModal = (id: string) => {
    const backgroundLocation = { pathname: location.pathname };
    navigate(`/coin/${id}`, { state: { backgroundLocation } });

    const endDate = new Date();
    const startDate = calcStartDate(selectedTimeRange, endDate);

    setStartDate(startDate);
    setEndDate(endDate);
  };

  const closeModal = async () => {
    animate(scope.current, {
      opacity: [1, 0],
    });

    const yStart = typeof y.get() === "number" ? y.get() : 0;

    await animate("#modal-body", {
      y: [yStart, height],
    });

    navigate("/");
    setIsDatepickerOpen(false);
  };

  useEffect(() => {
    const handleEscapePress = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    document.body.classList.add("overflow-hidden");
    document.addEventListener("keydown", handleEscapePress);

    return () => {
      document.body.classList.remove("overflow-hidden");
      document.removeEventListener("keydown", handleEscapePress);
    };
  }, []);

  return { openModal, closeModal, scope, controls, modalBodyRef, y };
};

export default useCoinInfoModal;
