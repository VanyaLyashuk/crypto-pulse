export interface IPaginationStore {
  currentPage: number;
  setCurrentpage: (page: number) => void;
  lastPage: number;
  setLastPage: (page: number) => void;
}