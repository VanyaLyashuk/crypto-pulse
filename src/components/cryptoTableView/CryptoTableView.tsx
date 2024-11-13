import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FC, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import useCoinsStore from "../../store/coins.store";
import { columns } from "./TableColumns";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

const CryptoTableView: FC = () => {
  const [sorting, setSorting] = useState([
    { id: "market_cap_rank", desc: false },
  ]);

  const { coins } = useCoinsStore(
    useShallow((state) => ({ coins: state.coins }))
  );

  const table = useReactTable({
    data: coins,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableSortingRemoval: false,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });

  return (
    <table className="min-w-full transition-all table-auto crypto-table">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableHeader key={headerGroup.id} headerGroup={headerGroup} />
        ))}
      </thead>
      <tbody className="bg-primary-bg">
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.original.id} row={row} />
        ))}
      </tbody>
    </table>
  );
};

export default CryptoTableView;
