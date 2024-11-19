import { motion } from "framer-motion";
import { IoMdPulse } from "react-icons/io";

const Logo = () => {
  return (
    <div className="flex items-center">
      <span className="text-[23px] font-chakra-petch uppercase mr-[2px] relative">
        Crypto{" "}
        <motion.span
          initial={{ width: "0%", opacity: 0 }}
          animate={{ width: "101%", opacity: 0.8 }}
          transition={{
            ease: "linear",
            delay: 2,
          }}
          className="absolute bottom-[18%] left-0 h-[24%] bg-primary z-[-1]"
        />
      </span>
      <IoMdPulse className="relative text-3xl text-primary right-1" />
    </div>
  );
};

export default Logo;
