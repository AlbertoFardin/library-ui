import * as React from "react";
import Btn from "../Btn";
import { ISegmentedButtonOption } from "./interfaces";

interface ISegmentedButtonsItem extends ISegmentedButtonOption {
  color: string;
  selected: boolean;
  onClick: (id: string) => void;
}
const SegmentedButtonsItem = ({
  id,
  color,
  selected,
  onClick,
  text,
  icon,
  tooltip,
}: ISegmentedButtonsItem) => {
  const onSelect = React.useCallback(() => onClick(id), [id, onClick]);
  return (
    <Btn
      tooltip={tooltip}
      selected={selected}
      color={color}
      icon={icon}
      label={text}
      iconStyle={selected ? { color } : undefined}
      onClick={onSelect}
    />
  );
};

export default SegmentedButtonsItem;
