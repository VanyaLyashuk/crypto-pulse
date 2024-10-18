import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useShallow } from "zustand/react/shallow";
import useCoinInfoStore from "../../store/coinInfo.store";

const CoinInfoDatepicker: React.FC = () => {
  const { startDate, setStartDate, endDate, setEndDate } = useCoinInfoStore(
    useShallow((state) => ({
      startDate: state.startDate,
      setStartDate: state.setStartDate,
      endDate: state.endDate,
      setEndDate: state.setEndDate,
    }))
  );
  const handleDateChange = (dates: unknown) => {
    if (Array.isArray(dates)) {
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);
    }
  };

  const today = new Date();
  const oneYearAgo = new Date(today);
  oneYearAgo.setFullYear(today.getFullYear() - 1);

  return (
    <div
      className="absolute z-50 mt-2"
      style={{
        right: -5,
        top: 37,
      }}
    >
      <DatePicker
        wrapperClassName="CoinInfoDatePicker"
        selected={startDate}
        onChange={handleDateChange}
        startDate={startDate}
        endDate={endDate}
        minDate={oneYearAgo}
        maxDate={today}
        selectsRange
        inline
      />
    </div>
  );
};

export default CoinInfoDatepicker;
