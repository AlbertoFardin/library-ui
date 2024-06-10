export interface ITab {
  className?: string;
  style?: React.CSSProperties;
  id: string;
  label: string | JSX.Element;
  icon?: string;
  tooltip?: string | string[];
}

export interface ITabs {
  className?: string;
  style?: React.CSSProperties;
  onChange?: (tabId: string) => void;
  items: ITab[];
  value: string;
  color?: string;
}
