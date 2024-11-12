import { FC } from "react";

import { IoClose } from "react-icons/io5";
import { ICoinInfoCloseProps } from "../../models";

const CoinInfoClose: FC<ICoinInfoCloseProps> = ({
  closeModal,
  onPointerDown,
}) => {
  return (
    <div
      onPointerDown={onPointerDown}
      className="absolute top-0 left-0 right-0 z-10 flex justify-center py-5 bg-primary-bg  md:bg-transparent md:top-[-38px] md:right-[-16px] md:p-2 md:left-auto md:z-[100] md:cursor-pointer"
    >
      <button className="hidden md:block" onClick={closeModal}>
        <IoClose className="w-8 h-8 text-cross-color" />
      </button>
      <button className="w-20 h-1.5 rounded cursor-grab touch-none-full bg-neutral-600 active:cursor-grabbing md:hidden" />
    </div>
  );
};

export default CoinInfoClose;
