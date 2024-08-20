import CryptoTable from "../../components/cryptoTable/CryptoTable";
import ErrorBoundary from "../../components/errorBoundary/ErrorBoundary";

interface IHomeProps {
  handleSetCoinId: (id: string) => void
}

const Home: React.FC<IHomeProps> = ({handleSetCoinId}) => {
  return (
    <>
      <ErrorBoundary>
        <CryptoTable handleSetCoinId={handleSetCoinId} />
      </ErrorBoundary>
    </>
  );
};

export default Home;
