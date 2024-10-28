import { motion } from "framer-motion";
import CryptoTable from "../../components/cryptoTable/CryptoTable";
import ErrorBoundary from "../../components/errorBoundary/ErrorBoundary";
import Header from "../../components/header/Header";
import Search from "../../components/search/Search";
import TypeWriter from "../../components/typeWriter/TypeWriter";

const Home: React.FC = () => {
  return (
    <div className="pt-[64px] pb-5">
      <Header />
      <div className="container flex flex-col justify-center pt-10 md:pt-20">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-center font-chakra-petch sm:text-4xl md:text-5xl">
            YOUR{" "}
            <span className="relative">
              ULTIMATE
              <motion.span
                initial={{ width: "0%", opacity: 0 }}
                animate={{ width: "101%", opacity: 0.8 }}
                transition={{
                  ease: "linear",
                  delay: 2,
                }}
                className="absolute bottom-[18%] left-0 h-[24%] bg-secondary z-[-1]"
              />
            </span>{" "}
            CRYPTO
            <br /> INSIGHT PLATFORM
          </h1>
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
