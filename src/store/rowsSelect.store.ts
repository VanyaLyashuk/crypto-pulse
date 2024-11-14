import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { IRowsSelectStore } from "../models";

const useRowsSelectStore = create<IRowsSelectStore>()(
  devtools(
    (set) => ({
      isRowsSelectOpen: false,
      setIsRowsSelectOpen: (isOpen) => set({ isRowsSelectOpen: isOpen }),
    }),
    { name: "RowsSelectStore" }
  )
);

export default useRowsSelectStore;
