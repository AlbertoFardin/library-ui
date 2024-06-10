export enum SelectViewType {
  LIST = "LIST",
  GRID = "GRID",
  BLOCK = "BLOCK",
  CALENDAR = "CALENDAR",
}

export const getViewLabel = (v: SelectViewType) => {
  switch (v) {
    case SelectViewType.CALENDAR:
      return "calendar";
    case SelectViewType.GRID:
      return "grid";
    case SelectViewType.LIST:
      return "list";
    case SelectViewType.BLOCK:
      return "block";
    default:
      return "Undefined";
  }
};
export const getViewIcon = (v: SelectViewType) => {
  switch (v) {
    case SelectViewType.CALENDAR:
      return "calendar_month";
    case SelectViewType.GRID:
      return "grid_on";
    case SelectViewType.LIST:
      return "format_list_bulleted";
    case SelectViewType.BLOCK:
      return "grid_view";
    default:
      return "help";
  }
};
