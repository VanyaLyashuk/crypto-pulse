import { useNavigate } from "react-router-dom";
import { ICoinInfoProps } from "../../models";

const CoinInfo: React.FC<ICoinInfoProps> = ({ id }) => {
  const navigate = useNavigate();
  const closeModal = () => navigate(-1);

  return (
    <div>
      <button onClick={closeModal}>Close Modal</button>
      <div>Coin info for {id}</div>
    </div>
  );
};

export default CoinInfo;
