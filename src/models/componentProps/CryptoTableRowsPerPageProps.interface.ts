export interface ICryptoTableRowsPerPageProps {
  rowsPerPage: number;
  onRowsChange: (
    e: React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>
  ) => void;
  isOpen: boolean;
  onToggleRowsSelect: () => void;
  options: number[];
}