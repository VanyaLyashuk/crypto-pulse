import coinImg from "../../assets/images/coin.png";

const Logo = () => {
  return (
    <div className="flex items-center gap-1 text-[26px] font-pixelify-sans">
      <img className="w-9" src={coinImg} alt="coin image" />
      <span className="text-primary-logo crypto-shadow">rypto</span>
      <span className="font-bold font-chakra-petch text-secondary">pulse</span>
    </div>
  );
};

export default Logo;
