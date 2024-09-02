import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { IPaginationStore } from "../models";

const usePaginationStore = create<IPaginationStore>()(
  devtools(
    (set) => ({
      currentPage: 1,
      setCurrentPage: (page) => set({ currentPage: page }),
      lastPage: 0,
      setLastPage: (page) => set({ lastPage: page }),
    }),
    { name: "paginationStore" }
  )
);

export default usePaginationStore;
