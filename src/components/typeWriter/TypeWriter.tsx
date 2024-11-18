import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ITypeWriterProps } from "../../models";

const LETTER_DELAY = 0.025;
const BOX_FADE_DURATION = 0.125;

const FADE_DELAY = 5;
const MANE_FADE_DURATION = 0.25;

const SWAP_DELAY_IN_MS = 5500;

const TypeWriter: React.FC<ITypeWriterProps> = ({ sentences }) => {
  const [sentencesIndex, setSentencesIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSentencesIndex((pv) => (pv + 1) % sentences.length);
    }, SWAP_DELAY_IN_MS);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <p className="mb-4 text-base font-light text-center uppercase md:mb-6">
      <span className="ml-3">
        {sentences[sentencesIndex].split("").map((l, i) => {
          return (
            <motion.span
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{
                delay: FADE_DELAY,
                duration: MANE_FADE_DURATION,
                ease: "easeIn",
              }}
              className="relative"
              key={`${sentencesIndex}-${i}`}
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * LETTER_DELAY, duration: 0 }}
                className="text-typewriter-text"
              >
                {l}
              </motion.span>
              <motion.span
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: [0, 1, 0],
                }}
                transition={{
                  delay: i * LETTER_DELAY,
                  times: [0, 0.1, 1],
                  duration: BOX_FADE_DURATION,
                  ease: "easeInOut",
                }}
                className="absolute bottom-[3px] left-[1px] right-0 top-[3px] bg-typewriter-text"
              />
            </motion.span>
          );
        })}
      </span>
    </p>
  );
};

export default TypeWriter;
