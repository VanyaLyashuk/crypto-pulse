import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ICoinInfoProps } from "../../models";

const CoinInfo: React.FC<ICoinInfoProps> = ({ id }) => {
  const navigate = useNavigate();

  const closeModal = () => navigate(-1);

  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => document.body.classList.remove("overflow-hidden");
  }, []);

  const handleInnerClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div
      onClick={closeModal}
      className="fixed inset-0 z-50 flex items-end justify-end bg-black bg-opacity-50 sm:p-6 sm:items-center"
    >
      <div
        onClick={handleInnerClick}
        className="w-full px-2 py-6 bg-white rounded-tl-xl rounded-tr-xl min-h-50vh sm:rounded-xl sm:max-w-[1024px] sm:m-auto"
      >
        Coin info for {id}
      </div>
    </div>
  );
};

export default CoinInfo;
