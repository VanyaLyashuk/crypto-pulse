export interface ITableViewStore {
  rows: number;
  setRows: (rows: number) => void;
  isRowsSelectOpen: boolean;
  setIsRowsSelectOpen: (isOpen: boolean) => void;
}