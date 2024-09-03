import CryptoTable from "../../components/cryptoTable/CryptoTable";
import ErrorBoundary from "../../components/errorBoundary/ErrorBoundary";

const Home: React.FC = () => {
  return (
    <>
      <ErrorBoundary>
        <CryptoTable />
      </ErrorBoundary>
    </>
  );
};

export default Home;
