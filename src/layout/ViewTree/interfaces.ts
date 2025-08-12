import { SelectType } from "../../core/Checkbox";

export interface IViewTreeItem {
  className?: string;
  style?: React.CSSProperties;
  id: string;
  parent: string;
  label?: string;
  icon?: string;
  tooltip?: string;
  loading?: boolean;
  disabled?: boolean;
  hasChildren?: boolean;
}

export interface IViewTreeAction {
  icon: string;
  tooltip: string;
  onClick: (listitemId: string) => void;
}

export interface IViewTree {
  className?: string;
  style?: React.CSSProperties;
  color?: string;
  items: IViewTreeItem[];
  expanded?: string[];
  selected?: string[];
  actions?: IViewTreeAction[];
  onClick?: (id: string) => void;
  onToggle?: (id: string) => void;
  selectType?: SelectType;
}
