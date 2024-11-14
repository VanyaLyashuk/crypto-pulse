import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { IRowsStore } from "../models";

const useRowsStore = create<IRowsStore>()(
  devtools(
    persist(
      (set) => ({
        rows: 30,
        setRows: (rows) => set({ rows }),
      }),
      { name: "rows" }
    ),
    { name: "RowsStore" }
  )
);

export default useRowsStore;
