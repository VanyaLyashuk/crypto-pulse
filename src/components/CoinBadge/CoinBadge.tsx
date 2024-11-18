import { motion } from "framer-motion";
import { FC } from "react";
import { fadeInUpAnimation } from "../../animations/animationsVariants";
import useCoinInfoModal from "../../hooks/useCoinInfoModal";
import { ICoinBadgeProps } from "../../models";
import FavoritesButton from "../favoritesButton/FavoritesButton";

const CoinBadge: FC<ICoinBadgeProps> = ({ id, name, thumb, symbol, index }) => {
  const { openModal } = useCoinInfoModal();
  
  return (
    <motion.li
      initial="hidden"
      whileInView="visible"
      variants={fadeInUpAnimation(index * 0.1)}
      viewport={{ once: true }}
      className="flex items-center p-2 text-sm rounded-lg shadow-md cursor-pointer gap-x-1.5 focus-visible-outline bg-filter-bg"
      onClick={() => openModal(id)}
      tabIndex={0}
    >
      <img className="w-6 h-6 shrink-0" src={thumb} alt={name} />
      <h4>{name}</h4>
      <span className="text-secondary-text">{symbol}</span>
      <FavoritesButton coinId={id} />
    </motion.li>
  );
};

export default CoinBadge;
