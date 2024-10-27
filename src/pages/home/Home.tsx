import CryptoTable from "../../components/cryptoTable/CryptoTable";
import ErrorBoundary from "../../components/errorBoundary/ErrorBoundary";
import Header from "../../components/header/Header";
import Search from "../../components/search/Search";
import TypeWriter from "../../components/typeWriter/TypeWriter";

const Home: React.FC = () => {
  return (
    <div className="pt-[64px] pb-5">
      <Header />
      <div className="container flex flex-col justify-center mt-10">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-center font-chakra-petch sm:text-4xl">YOUR ULTIMATE CRYPTO<br /> INSIGHT PLATFORM</h1>
          <TypeWriter
            sentences={[
              "Start typing to search, or use the table for quick access",
              "Input a coin name or browse the list for detailed data",
            ]}
          />
        </div>
        <Search />
      </div>
      <ErrorBoundary>
        <CryptoTable />
      </ErrorBoundary>
    </div>
  );
};

export default Home;
