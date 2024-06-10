export enum Weight {
  light = "Light",
  regular = "Regular",
  medium = "Medium",
}

export default interface ILogoWarda {
  className?: string;
  style?: React.CSSProperties;
  color?: string;
  height?: number;
  onClick?: (event: React.MouseEvent) => void;
  weight?: Weight;
  width?: number;
}
