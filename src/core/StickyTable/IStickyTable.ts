export interface IRendererCorner {
  width: number;
  height: number;
  top: number;
  left: number;
  zIndex: number;
}

export interface IRenderer {
  data;
  style: React.CSSProperties;
  className: string;
  rowIndex: number;
  columnIndex: number;
  selected: boolean;
  disabled: boolean;
  highligh: boolean;
}
export interface IStickTableRow {
  value; // obbligatoria - lo leggo nella memoizzarione
  loading?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface IStickyTable {
  topData?: IStickTableRow[];
  rightData?: IStickTableRow[];
  bottomData?: IStickTableRow[];
  leftData?: IStickTableRow[];
  width: number;
  height: number;
  columns: string[];
  columnWidth?: number | ((i: number) => number);
  rows: IStickTableRow[][];
  rowsIndexSelected?: number[];
  rowsIndexDisabled?: number[];
  rowsIndexHighligh?: number[];
  rowsCount: number;
  rowHeight?: number | ((i: number) => number);
  topHeight?: number;
  rightWidth?: number;
  bottomHeight?: number;
  leftWidth?: number;
  CellRenderer?: (p: IRenderer) => JSX.Element | React.ReactNode;
  TopRenderer?: (p: IRenderer) => JSX.Element | React.ReactNode;
  RightRenderer?: (p: IRenderer) => JSX.Element | React.ReactNode;
  BottomRenderer?: (p: IRenderer) => JSX.Element | React.ReactNode;
  LeftRenderer?: (p: IRenderer) => JSX.Element | React.ReactNode;
  TopLeftRender?: (p: IRendererCorner) => JSX.Element | React.ReactNode;
  TopRightRender?: (p: IRendererCorner) => JSX.Element | React.ReactNode;
  BottomLeftRender?: (p: IRendererCorner) => JSX.Element | React.ReactNode;
  BottomRightRender?: (p: IRendererCorner) => JSX.Element | React.ReactNode;
  overscan?: number;
  children?: JSX.Element | React.ReactNode;
  resetScrollbarX?: number;
  resetScrollbarY?: number;
}
