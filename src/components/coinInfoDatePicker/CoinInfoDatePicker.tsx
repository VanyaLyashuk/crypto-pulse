import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ICoinInfoDatePickerProps } from "../../models";

const CoinInfoDatepicker: React.FC<ICoinInfoDatePickerProps> = ({
  startDate,
  endDate,
  handleDateChange,
}) => {
  return (
    <div
      className="absolute z-50 mt-2"
      style={{
        right: 0,
        top: 37,
      }}
    >
      <DatePicker
        wrapperClassName="CoinInfoDatePicker"
        selected={startDate}
        onChange={handleDateChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
      />
    </div>
  );
};

export default CoinInfoDatepicker;
