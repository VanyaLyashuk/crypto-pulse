import { IPaginationProps } from "./Pagination.interface";

export interface IPaginationComponentProps
  extends Omit<IPaginationProps, "onPageChange"> {
  onPageChange: (count: number) => void;
}
