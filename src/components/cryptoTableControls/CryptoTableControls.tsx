import React from "react";
import { ICryptoTableControlsProps } from "../../models";
import CryptoTableRowsPerPage from "../cryptoTableRowsPerPage/CryptoTableRowsPerPage";

const CryptoTableControls: React.FC<ICryptoTableControlsProps> = ({
  rowsPerPage,
  onRowsChange,
}) => {
  return (
    <div className="flex justify-end w-full pt-4 px-2 max-w-[1300px] m-auto">
      <CryptoTableRowsPerPage
        rowsPerPage={rowsPerPage}
        onRowsChange={onRowsChange}
      />
    </div>
  );
};

export default CryptoTableControls;
