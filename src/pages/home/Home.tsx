import CryptoTable from "../../components/cryptoTable/CryptoTable";
import ErrorBoundary from "../../components/errorBoundary/ErrorBoundary";
import Header from "../../components/header/Header";

const Home: React.FC = () => {
  return (
    <div className="pt-[64px] pb-5">
      <Header />
      <ErrorBoundary>
        <CryptoTable />
      </ErrorBoundary>
    </div>
  );
};

export default Home;
