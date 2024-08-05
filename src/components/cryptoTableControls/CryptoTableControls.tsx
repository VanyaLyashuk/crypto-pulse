import React from "react";

const CryptoTableControls: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  return (
    <div className="flex justify-center w-full px-2 max-w-[1300px] m-auto">
      {children}
    </div>
  );
};

export default CryptoTableControls;
