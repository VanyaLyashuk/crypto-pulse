import useRowsStore from "../store/rows.store";
import useRowsSelectStore from "../store/rowsSelect.store";

const useCryptoTableRows = () => {
  const rows = useRowsStore((state) => state.rows);
  const setRows = useRowsStore((state) => state.setRows);

  const isRowsSelectOpen = useRowsSelectStore((state) => state.isRowsSelectOpen);
  const setIsRowsSelectOpen = useRowsSelectStore((state) => state.setIsRowsSelectOpen);

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
