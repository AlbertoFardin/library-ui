import { CheckBoxType } from "../../core/AssetCheckbox";
import { IKeyDown } from "../../core/BtnBase";
import { PopoverOrigin } from "../../core/Popover";
import { IPopoverListItem } from "../../core/PopoverList";
import { IPreview } from "../../core/Preview";

export type LayoutType = 1 | 2;

export interface IViewBlockAsset {
  className?: string;
  style?: React.CSSProperties;
  color?: string;
  width: number;
  onCheck?: (e: React.MouseEvent, p: IKeyDown) => void;
  onClick?: (e: React.MouseEvent, p: IKeyDown) => void;
  onDoubleClick?: (e: React.MouseEvent, p: IKeyDown) => void;
  onContextMenu?: (e: React.MouseEvent, open: boolean) => void;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
  onLongPress?: (e: React.TouchEvent) => void;
  preview?: IPreview;
  contextmenu?: IPopoverListItem[];
  contextmenuOriginAnchor?: PopoverOrigin;
  contextmenuOriginTransf?: PopoverOrigin;
  contextmenuPosizionZone?: 1 | 2 | 3 | 4;
  icon: string;
  label: string;
  disabled?: boolean;
  selected?: boolean;
  children?: React.ReactNode;
  checkbox?: CheckBoxType;
  labelAdornment?: React.ReactNode;
  layout?: LayoutType;
}
