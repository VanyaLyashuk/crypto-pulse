import React from "react";

const CryptoTableControls: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  return (
    <div className="container flex justify-center">
      {children}
    </div>
  );
};

export default CryptoTableControls;
