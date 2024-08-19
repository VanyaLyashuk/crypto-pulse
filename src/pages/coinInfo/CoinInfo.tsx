import { ICoinInfoProps } from "../../models";

const CoinInfo: React.FC<ICoinInfoProps> = ({ id }) => {
  return <div>Coin {id}</div>;
};

export default CoinInfo;
