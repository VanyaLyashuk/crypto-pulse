import { Route, Routes, useLocation } from "react-router-dom";
import CoinInfo from "./pages/coinInfo/CoinInfo";
import Home from "./pages/home/Home";

const App: React.FC = () => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<Home />} />
        <Route
          path="/coin/:coinId"
          element={
            <>
              <Home />
              <CoinInfo />
            </>
          }
        />
      </Routes>
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/coin/:coinId" element={<CoinInfo />} />
        </Routes>
      )}
    </>
  );
};

export default App;
