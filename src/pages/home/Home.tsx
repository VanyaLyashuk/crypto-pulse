import CryptoTable from "../../components/cryptoTable/CryptoTable";
import ErrorBoundary from "../../components/errorBoundary/ErrorBoundary";
import Header from "../../components/header/Header";

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <ErrorBoundary>
        <CryptoTable />
      </ErrorBoundary>
    </>
  );
};

export default Home;
