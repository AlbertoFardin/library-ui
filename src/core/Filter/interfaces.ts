export type FilterType = string;

export interface IChangesBase<V> {
  id: string;
  type: string;
  value: V;
}

export interface IFilterBase<T, C> {
  /** Filter identification. It will return in onChange */
  id: string;
  /** Filter type */
  type?: FilterType;
  /** Filter value. It is different between Filter  */
  value?: null | T;
  /** Main color */
  color?: string;
  /** Component CSS style */
  style?: React.CSSProperties;
  /** Component CSS classname */
  className?: string;
  /** Filter label */
  label?: string;
  /** Filter sub-label */
  labelSub?: string;
  /** Callback fire on change value. It return {id, type, value} */
  onChange?: (changes: C) => void;
  /** Callback fire on click count */
  onClickCount?: () => void;
  /** If true, facet is collapsed */
  collapsed?: boolean;
  /** If valued and facet is collapsed, show the help icon with tooltip  */
  collapsedHelp?: string | string[];
  /** If true, facet no render collapse icon */
  collapsedHide?: boolean;
  /** If true, show red indicator near label */
  mandatory?: boolean;
  /** If valued, show the help icon with tooltip */
  help?: string | string[];
}
