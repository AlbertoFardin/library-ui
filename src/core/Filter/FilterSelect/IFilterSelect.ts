import { IFilterBase, IChangesBase } from "../interfaces";

export type SelectValue = string[];

export interface IChangesSelect extends IChangesBase<IFilterSelectItem[]> {
  options?: IFilterSelectItem[];
}

export interface IFilterSelectItem {
  style?: React.CSSProperties;
  className?: string;
  id: string;
  label: string;
  labelStyle?: React.CSSProperties;
  labelClassName?: string;
  subLabel?: string;
  count?: number;
  color?: string;
}

interface IFilterSelect extends IFilterBase<SelectValue, IChangesSelect> {
  /** Set max items selectable */
  maxItems?: number;
  /** Array of items to show how suggestions */
  options?: IFilterSelectItem[];
  /** Count of more options not visible */
  optionsMore?: number;
  /** Callback fired when use search input */
  onSearch?: (inputValue: string) => void;
  /** Show loading spinner and facet is closed */
  loading?: boolean;
  /** Show loading spinner in search input */
  loadingSearch?: boolean;
  /** If true, render a search input */
  searchable?: boolean;
  /** footer component */
  footer?: JSX.Element | React.ReactNode;
}

export default IFilterSelect;
