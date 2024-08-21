import React from "react";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { IArrowIconProps } from "../../models";

const ArrowIcon: React.FC<IArrowIconProps> = ({
  arrowSize,
  isNegative,
}) => {
  return isNegative ? (
    <BiSolidDownArrow className={arrowSize} />
  ) : (
    <BiSolidUpArrow className={arrowSize} />
  );
};

export default ArrowIcon;
