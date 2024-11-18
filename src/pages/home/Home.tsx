import { motion } from "framer-motion";
import { useRef } from "react";
import CryptoTable from "../../components/cryptoTable/CryptoTable";
import CryptoTableRows from "../../components/cryptoTableRows/CryptoTableRows";
import ErrorBoundary from "../../components/errorBoundary/ErrorBoundary";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import ScrollToTopButton from "../../components/scrollToTopButton/ScrollToTopButton";
import Search from "../../components/search/Search";
import TypeWriter from "../../components/typeWriter/TypeWriter";

const Home: React.FC = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);

  return (
    <>
      <div className="fixed inset-0 w-full h-full bg-primary-bg bg-[radial-gradient(var(--dots-color)_1px,transparent_1px)] [background-size:16px_16px] z-[-1] dark:hidden"></div>
      <div className="flex flex-col pt-[64px] min-h-screen">
        <Header />
        <div className="container flex flex-col justify-center pt-10 md:pt-20">
          <div>
            <h1
              ref={headingRef}
              className="mb-2 text-3xl font-bold text-center font-chakra-petch sm:text-4xl md:text-5xl"
            >
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
          <ErrorBoundary>
            <Search />
          </ErrorBoundary>
        </div>
        <div className="container">
          <CryptoTableRows options={[30, 50, 100]} />
        </div>
        <ErrorBoundary>
          <CryptoTable />
        </ErrorBoundary>
        <Footer />
      </div>
      <ScrollToTopButton targetRef={headingRef} />
    </>
  );
};

export default Home;
