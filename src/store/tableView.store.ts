import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { ITableViewStore } from "../models";

const useTableViewStore = create<ITableViewStore>()(
  devtools(
    (set) => ({
      rows: 30,
      setRows: (rows) => set({ rows }),
      isRowsSelectOpen: false,
      setIsRowsSelectOpen: (isOpen) => set({ isRowsSelectOpen: isOpen }),
    }),
    { name: "tableView" }
  )
);

export default useTableViewStore;
