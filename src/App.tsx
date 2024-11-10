import { FC, lazy, Suspense } from "react";
import 'react-datepicker/dist/react-datepicker.css';
import { Route, Routes, useLocation } from "react-router-dom";
import SpinnerIcon from "./components/UI/SpinnerIcon";

const CoinInfo = lazy(() => import("./pages/coinInfo/CoinInfo"));
const Home = lazy(() => import("./pages/home/Home"));

const App: FC = () => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <Suspense
      fallback={
        <div className="grid h-screen place-content-center bg-primary-bg">
          <SpinnerIcon />
        </div>
      }
    >
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
    </Suspense>
  );
};

export default App;
