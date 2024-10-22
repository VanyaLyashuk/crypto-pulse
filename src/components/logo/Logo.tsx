import coinImg from "../../assets/images/coin.png";

const Logo = () => {
  return (
    <h1 className="text-[28px] font-pixelify-sans flex items-center gap-[2px]">
      <img className="w-9" src={coinImg} alt="coin image" />
      <span className="text-coinGold crypto-shadow">rypto</span>
      <span className="font-sans font-bold text-secondary second-font">pulse</span>
    </h1>
  );
};

export default Logo;
