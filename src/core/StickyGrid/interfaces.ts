import { IBtn } from "../Btn";
import { IKeyDown } from "../BtnBase";
import { IPopoverListItem } from "../PopoverList";
import { IRenderer } from "../StickyTable";
import { ISort } from "../../interfaces";
import TypeCell from "./TypeCell";

export interface ILeftData {
  value: string; // needed to StickyTable
  rowIndex: number;
  rowData;
  contextmenu: IPopoverListItem[];
  onClick: (p: ICellClick) => void;
  onContextMenu: (p: ICellClick) => void;
  onCopyToClipboard?: (text: string) => void;
}
export interface IRendererLeft extends IRenderer {
  data: ILeftData;
}

export interface IColumn {
  type: TypeCell;
  id: string;
  label: string;
  width: number;
  sortable?: boolean;
  keyword?: boolean;
  mandatory?: boolean;
}

export interface StructColumn {
  id: string;
  width: number;
}

export interface SearchColumnInterface {
  onChange: (...key) => void;
  onClose: (...key) => void;
  enabledColumns: {
    columnId: string;
    i18n: {
      "search.placeHolder": string;
    };
    value: string;
  }[];
}

export interface IGetCell {
  selected: boolean;
  cellStyle;
  rowHeight: number;
  column: IColumn;
  rowData;
}

export interface ICellRenderer {
  columnIndex: number;
  rowIndex: number;
  selected: boolean;
  disabled: boolean;
  highligh: boolean;
  style: React.CSSProperties;
  contextmenu: IPopoverListItem[];
  onClick: (p: ICellClick) => void;
  onContextMenu: (p: ICellClick) => void;
  onCopyToClipboard?: (text: string) => void;
}

export interface IRenderCellSidebar extends ICellRenderer {
  rowData;
}
export interface IRenderCellContent extends ICellRenderer {
  columnData: IColumn;
}

export interface IThumbnailButton {
  disabled: boolean;
  onClick: (event: React.MouseEvent, keyDown: IKeyDown) => void;
  onDoubleClick: (event: React.MouseEvent, keyDown: IKeyDown) => void;
  columnIndex: number;
  rowIndex: number;
  selected: boolean;
  highligh: boolean;
  thumbSize: number;
  thumbMargin: number;
  thumbId: string;
  thumbMimeType: string;
  thumbSrcUrl: string;
  mousehover: boolean;
  setMousehover: (b: boolean) => void;
}

export interface IThumbnail {
  className?: string;
  style?: React.CSSProperties;
  Button?: (p: IThumbnailButton) => JSX.Element;
  id: string;
  placeholderLabel?: string;
  placeholderLabelStyle?: React.CSSProperties;
  placeholderLabelRequired?: boolean;
  placeholderIcon?: string;
  placeholderIconStyle?: React.CSSProperties;
  previewStyle?: React.CSSProperties;
  previewClassName?: string;
  previewMimeType: string;
  previewSrcUrl: string;
}

export interface ICellClick {
  eventDetail: number;
  columnIndex: number;
  rowIndex: number;
  selected: boolean;
  highligh: boolean;
  keyDownCtrl: boolean;
  keyDownMeta: boolean;
  thumbId?: string;
}

export interface ICellUserData {
  id: string;
  name: string;
  avatar: string;
  avatarText: string;
  avatarIcon: string;
}

export interface IGridRow {
  id: string;
  data;
}
export interface ICommonStickyGrid {
  /** 
    The number of items (rows or columns) to render outside of the visible area. This property can be important for two reasons:
    * Overscanning by one row or column allows the tab key to focus on the next (not yet visible) item.
    * Overscanning slightly can reduce or prevent a flash of empty space when a user first starts scrolling.
    Note that overscanning too much can negatively impact performance
  */
  overscan?: number;
  /** Function that return cell's value */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getCellValue?: (rowData, colum: IColumn) => any;
  /** If a cell's value is equal to a key of this map, the cell show a Btn */
  overrideCellMap?: { [keyError: string]: IBtn };
  /** If valued, the grid content render this */
  overrideContent?: JSX.Element | React.ReactNode;
  /** Function to override cell content render, return a cell component to render */
  renderCellContent?: (p: IRenderCellContent) => JSX.Element;
  /** Function to override cell content placeholder, return a cell component to render */
  renderCellPlaceholder?: (p: IRenderCellContent) => JSX.Element;
  /** Callback return user data for CellUser */
  getUser?: (userId: string) => ICellUserData;
  //
  //
  //
  //
  /** If true, enable resize columns */
  enabledColumnsResize?: boolean;
  /** If true, enable move columns */
  enabledColumnsMove?: boolean;
  /** If true, enable multi sort columns */
  enabledColumnsMultiSort?: boolean;
  /** If true, enable remove columns */
  enabledColumnsRemove?: boolean;
  /** Columns' sort array */
  columnsSort?: ISort[];
  //
  //
  //
  //
  /** Left column sticky width */
  sidebarWidth?: number;
  /** Return sidebar's value, change this to rerender cell */
  getSidebarValue?: (rowData) => string;
  /** Render to override cells of column sticky, return a cell component to render */
  renderCellSidebar?: (p: IRenderCellSidebar) => JSX.Element;
  //
  //
  //
  //
  /** Header's height */
  headerHeight?: number;
  /** Callback fired on header click or sort */
  onHeaderClick?: (sort: ISort[]) => void;
  //
  //
  //
  //
  /** Rows's array data */
  rows: IGridRow[];
  /** Array of rows selected */
  rowsSelected?: string[];
  /** Array of rows disabled */
  rowsDisabled?: string[];
  /** Array of rows highligh */
  rowsHighligh?: string[];
  /** Row's contextmenu's items */
  rowContextmenu?: IPopoverListItem[];
  /** Forced thumbnail size (squared) in Cellthumbnails cell */
  rowThumbnailSize?: number;
  /** Function that return the row's height */
  rowHeight?: (index: number) => number;
  /** Callback fired on row click and double click */
  onRowClick?: (p: ICellClick) => void;
  /** Callback fired on row contextmenu */
  onRowContextMenu?: (p: ICellClick) => void;
  /** Callback fired on click icon "copy to clipboard" */
  onRowCopyToClipboard?: (s: string) => void;

  //
  //
  //
  //
  /** If true, render a loading spinner */
  rootLoading?: boolean;
  /** If true, render a placeholder error message */
  rootError?: boolean;
  /** Component's CSS classname */
  rootClassName?: string;
  /** Component's contextmenu's items */
  rootContextmenu?: IPopoverListItem[];
  /** Callback fired on component click. ex: click on empty content or click on header (also to resize) */
  onRootClick?: (event: React.MouseEvent) => void;
}

export interface IStickyGrid extends ICommonStickyGrid {
  /** Function to override cell canton render, return a cell component to render */
  renderCanton?: () => JSX.Element;
  /** Columns' array config */
  columns: IColumn[];
  /** Callback fired on columns changed */
  onColumnsChange?: (structColumns: IColumn[]) => void;
  /** Reset columns in state*/
  resetColumns?: number | string;
}
