import { flexRender, Row } from "@tanstack/react-table";
import { FC } from "react";
import useCoinInfoModal from "../../hooks/useCoinInfoModal";
import { ITransformedCoinsMarketData } from "../../models";
import { getCellClasses } from "../../utils/CryptoTableUtils";

interface TableRowProps {
  row: Row<ITransformedCoinsMarketData>;
}

const TableRow: FC<TableRowProps> = ({ row }) => {
  const { openModal } = useCoinInfoModal();

  return (
    <tr
      onClick={() => openModal(row.original.id)}
      className="cursor-pointer group"
    >
      {row.getVisibleCells().map((cell, index) => {
        return (
          <td
            key={cell.id}
            className={getCellClasses(cell, index)}
            style={{ width: cell.column.getSize() }}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        );
      })}
    </tr>
  );
};

export default TableRow;
