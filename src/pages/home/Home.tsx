import CryptoTable from "../../components/cryptoTable/CryptoTable";
import ErrorBoundary from "../../components/errorBoundary/ErrorBoundary";
import Header from "../../components/header/Header";
import Search from "../../components/search/Search";

const Home: React.FC = () => {
  return (
    <div className="pt-[64px] pb-5">
      <Header />
      <div className="container flex justify-center mt-10">
        <Search />
      </div>
      <ErrorBoundary>
        <CryptoTable />
      </ErrorBoundary>
    </div>
  );
};

export default Home;
