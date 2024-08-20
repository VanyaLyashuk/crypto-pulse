import { useCallback, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import CoinInfo from "./pages/coinInfo/CoinInfo";
import Home from "./pages/home/Home";

const App: React.FC = () => {
  const [coinId, setCoinId] = useState<string>("");

  const handleSetCoinId = useCallback((id: string) => {
    setCoinId(id);
  }, [])
  
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <div className="py-10">
      <>
        <Routes location={state?.backgroundLocation || location}>
          <Route path="/" element={<Home handleSetCoinId={handleSetCoinId} />} />
          <Route path="/coin/:id" element={<CoinInfo id={coinId} />} />
        </Routes>
        {state?.backgroundLocation && (
          <Routes>
            <Route path="/coin/:id" element={<CoinInfo id={coinId} />} />
          </Routes>
        )}
      </>
    </div>
  );
};

export default App;
