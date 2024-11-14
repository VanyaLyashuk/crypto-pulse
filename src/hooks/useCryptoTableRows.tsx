import { useShallow } from "zustand/react/shallow";
import useTableViewStore from "../store/tableView.store";

const useCryptoTableRows = () => {
  const { rows, setRows, isRowsSelectOpen, setIsRowsSelectOpen } =
    useTableViewStore(
      useShallow((state) => ({
        rows: state.rows,
        setRows: state.setRows,
        isRowsSelectOpen: state.isRowsSelectOpen,
        setIsRowsSelectOpen: state.setIsRowsSelectOpen,
      }))
    );

  const onRowsChange = (
    e: React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>
  ) => {
    setRows(Number(e.currentTarget.getAttribute("data-value")));
    setIsRowsSelectOpen(false);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLLIElement>) => {
    if (e.key === "" || e.key === "Enter") {
      onRowsChange(e);
    }
  };
  return {
    rows,
    isRowsSelectOpen,
    handleKeyUp,
    onRowsChange,
    setIsRowsSelectOpen,
  };
};

export default useCryptoTableRows;
