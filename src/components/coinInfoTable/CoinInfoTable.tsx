import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { ICoinInfoTableProps } from "../../models";
import PriceChangeIndicator from "../priceChangeIndicator/PriceChangeIndicator";

const CoinInfoTable: React.FC<ICoinInfoTableProps> = ({ data }) => {
  const columns = useMemo<ColumnDef<Record<string, number>>[]>(
    () =>
      data.map((item) => ({
        header: item.label,
        accessorKey: item.label,
        cell: (info) => (
          <PriceChangeIndicator
            arrowSize="w-2 h-2"
            alignment="center"
            className="text-sm"
            value={info.getValue<number>()}
          />
        ),
      })),
    [data]
  );

  const tableData = useMemo(() => {
    const rowData: Record<string, number> = {};
    data.forEach((item) => {
      rowData[item.label] = item.value;
    });
    return [rowData];
  }, [data]);

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="w-full overflow-hidden text-center">
      <thead className="text-sm bg-gray-100">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} className="px-2 py-3 border-r last:border-r-0">
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="px-2 py-3 border-r last:border-r-0">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CoinInfoTable;
