import {
  ISegmentedView,
  SegmentedViewType,
  VIEW_ICON,
  VIEW_TEXT,
} from "./interfaces";
import { getTheme } from "../../theme";
import SegmentedButton from "../SegmentedButton";

const SegmentedView = ({
  className,
  style,
  color = getTheme().colors.theme1,
  value,
  options,
  onChange,
}: ISegmentedView) => (
  <SegmentedButton
    style={style}
    className={className}
    value={value}
    options={options.map((type: SegmentedViewType) => ({
      id: type,
      icon: VIEW_ICON[type],
      tooltip: `Switch to ${VIEW_TEXT[type]} layout`,
    }))}
    color={color}
    onChange={onChange}
  />
);

export default SegmentedView;
