import { IItemRender, IViewBlockItem } from "./utils";
import { IPopoverListItem } from "../../core/PopoverList";

export interface IItemDecorator {
  type: string;
  indexRow: number;
  indexCol: number;
  totalRows: number;
  totalCols: number;
}

export interface IViewBlock {
  className?: string;
  style?: React.CSSProperties;
  color?: string;
  contextmenu?: IPopoverListItem[];
  itemWidth: number;
  itemHeight: (type: string) => number;
  itemRender: (p: IItemRender) => JSX.Element | React.ReactNode;
  itemHeader?: (p: IItemDecorator) => JSX.Element | React.ReactNode;
  itemFooter?: (p: IItemDecorator) => JSX.Element | React.ReactNode;
  needHeader?: {
    [type: string]: number;
  };
  needFooter?: {
    [type: string]: number;
  };
  items: IViewBlockItem[];
  itemsSelectedId?: string[];
  itemsTypeSort?: string[];
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
  borderTop?: boolean;
}
