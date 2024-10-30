import logo from "../../assets/images/coingecko.png";

const Footer = () => {
  return (
    <footer className="container flex flex-col items-center justify-center w-full py-6 mt-auto text-base text-center sm:flex-row sm:justify-between sm:text-left">
      <p>© 2024. All rights reserved</p>
      <p className="flex gap-1">
        Powered by <img className="w-6 h-6" src={logo} alt="Coingecko logo" />{" "}
        <span>CoinGecko API</span>
      </p>
      <p className="whitespace-nowrap">
        Coded by{" "}
        <a
          className="underline rounded-sm focus-visible-outline hover:text-secondary"
          href="https://www.linkedin.com/in/ivan-lyashuk/"
          target="_blank"
          rel="noreferrer noopener"
        >
          Ivan Lyashuk
        </a>
      </p>
    </footer>
  );
};

export default Footer;
