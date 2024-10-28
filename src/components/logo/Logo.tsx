import coinImg from "../../assets/images/coin.png";

const Logo = () => {
  return (
    <h1 className="flex items-center gap-1 text-[26px] font-pixelify-sans">
      <img className="w-9" src={coinImg} alt="coin image" />
      <span className="text-primary-logo crypto-shadow">rypto</span>
      <span className="font-sans font-bold text-secondary">pulse</span>
    </h1>
  );
};

export default Logo;
