import { IPopoverListItem } from "../../core/PopoverList";
import { IItemRender, IViewListColumn, IViewListItem } from "./utils";
import { ISortOrder } from "../../interfaces";

export interface IItemDecorator {
  type: string;
  indexRow: number;
  totalRows: number;
}

export interface IViewList {
  className?: string;
  style?: React.CSSProperties;
  color?: string;
  contextmenu?: IPopoverListItem[];
  columns?: IViewListColumn[];
  columnsSortId?: string;
  columnsSortOrder?: ISortOrder;
  itemHeight: (type: string) => number;
  itemRender: (p: IItemRender) => JSX.Element;
  itemHeader?: (p: IItemDecorator) => JSX.Element | React.ReactNode;
  itemFooter?: (p: IItemDecorator) => JSX.Element | React.ReactNode;
  needHeader?: {
    [type: string]: number;
  };
  needFooter?: {
    [type: string]: number;
  };
  needToolbar?: boolean;
  items: IViewListItem[];
  itemsSelectedId?: string[];
  itemsTypeSort?: string[];
  onColumnSort?: (id: string, order: ISortOrder) => void;
  onClick?: (event: React.MouseEvent) => void;
  onContextMenu?: (event: React.MouseEvent) => void;
  resetScrollbar?: number;
  loading?: boolean;
  placeholderIcon?: string;
  placeholderIconStyle?: React.CSSProperties;
  placeholderIconClassName?: string;
  placeholderLabel?: string;
  placeholderLabelStyle?: React.CSSProperties;
  placeholderLabelClassName?: string;
}
