import { useShallow } from "zustand/react/shallow";
import useRowsStore from "../store/rows.store";
import useRowsSelectStore from "../store/rowsSelect.store";

const useCryptoTableRows = () => {
  const rows = useRowsStore(useShallow((state) => state.rows));
  const setRows = useRowsStore(useShallow((state) => state.setRows));

  const isRowsSelectOpen = useRowsSelectStore(
    useShallow((state) => state.isRowsSelectOpen)
  );
  const setIsRowsSelectOpen = useRowsSelectStore(
    useShallow((state) => state.setIsRowsSelectOpen)
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
