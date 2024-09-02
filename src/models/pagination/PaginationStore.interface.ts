export interface IPaginationStore {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  lastPage: number;
  setLastPage: (page: number) => void;
}