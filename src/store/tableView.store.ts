import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { ITableViewStore } from "../models";

const useTableViewStore = create<ITableViewStore>()(
  devtools(
    (set) => ({
      rowsPerPage: 30,
      setRowsPerPage: (rows) => set({ rowsPerPage: rows }),
      isRowsSelectOpen: false,
      setIsRowsSelectOpen: (isOpen) => set({ isRowsSelectOpen: isOpen }),
    }),
    { name: "tableView" }
  )
);

export default useTableViewStore;
