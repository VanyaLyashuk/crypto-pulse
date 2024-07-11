import React from "react";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";

interface IArrowIconProps {
  isNegative: boolean;
}

const ArrowIcon: React.FC<IArrowIconProps> = ({ isNegative }) => {
  return isNegative ? (
    <BiSolidDownArrow className="table-body-arrow" />
  ) : (
    <BiSolidUpArrow className="table-body-arrow" />
  );
};

export default ArrowIcon;
