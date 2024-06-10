import { PopoverOrigin } from "../Popover";

export interface IPagination {
  /** Component CSS classes */
  className?: string;
  /** Total count of items to paginate */
  count: number;
  /** Label render BEFORE pagination inputs */
  textPrev?: string;
  /** Label render AFTER pagination inputs */
  textNext?: string;
  /** Callback fire on input change */
  onChangeCurr: (curr: number) => void;
  /** Callback fire on select a different page size */
  onChangeSize?: (sizes: IPageSize[]) => void;
  /** Current page selected */
  pageCurr: number;
  /** Page size, or, if there are many, array of page size. Each one API:
   *
   * * *label*: string,
   * * *value*: number,
   * * *selected*: boolean,
   */
  pageSize: IPageSize[] | number;
  /** component CSS style */
  style?: React.CSSProperties;
  /** if true, the component is minimized */
  minimal?: boolean;
  menuOriginAnchor?: PopoverOrigin;
  menuOriginTransf?: PopoverOrigin;
}

export interface IPageSize {
  label: string;
  value: number;
  selected: boolean;
}
