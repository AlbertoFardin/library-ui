export interface ISegmentedButtonOption {
  id: string;
  text?: string;
  icon?: string;
  tooltip?: string | string[];
}

export interface ISegmentedButton {
  className?: string;
  style?: React.CSSProperties;
  color?: string;
  value: string;
  options: ISegmentedButtonOption[];
  onChange: (slc: string) => void;
}
