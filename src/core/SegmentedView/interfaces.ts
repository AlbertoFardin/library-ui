export enum SegmentedViewType {
  LIST = "LIST",
  GRID = "GRID",
  BLOCK = "BLOCK",
  CALENDAR = "CALENDAR",
}

export const VIEW_TEXT = {
  [SegmentedViewType.CALENDAR]: "calendar",
  [SegmentedViewType.GRID]: "grid",
  [SegmentedViewType.LIST]: "list",
  [SegmentedViewType.BLOCK]: "block",
}; // Undefined
export const VIEW_ICON = {
  [SegmentedViewType.CALENDAR]: "calendar_month",
  [SegmentedViewType.GRID]: "grid_on",
  [SegmentedViewType.LIST]: "format_list_bulleted",
  [SegmentedViewType.BLOCK]: "grid_view",
}; // help

export interface ISegmentedView {
  className?: string;
  style?: React.CSSProperties;
  color?: string;
  value: SegmentedViewType;
  options: SegmentedViewType[];
  onChange: (slc: SegmentedViewType) => void;
}
