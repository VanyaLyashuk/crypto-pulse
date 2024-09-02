export interface ITableViewStore {
  rowsPerPage: number;
  setRowsPerPage: (rows: number) => void;
  isRowsSelectOpen: boolean;
  setIsRowsSelectOpen: (isOpen: boolean) => void;
}