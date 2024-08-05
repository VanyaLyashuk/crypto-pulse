export interface IPaginationProps {
  totalCount: number;
  pageSize: number;
  siblingCount?: number;
  currentPage: number;
  onPageChange?: (count: number) => void;
}