import { ICoinInfoChartSkeletonProps } from "../../models";
import SpinnerIcon from "../UI/SpinnerIcon";

const CoinInfoChartSkeleton: React.FC<ICoinInfoChartSkeletonProps> = ({
  message,
}) => {
  return (
    <div className="grid w-full h-[500px] place-items-center">
      {message ? <p>{message}</p> : <SpinnerIcon />}
    </div>
  );
};

export default CoinInfoChartSkeleton;
