import * as React from "react";
import Btn from "../Btn";
import { SelectViewType, getViewIcon, getViewLabel } from "./utils";

interface ISelectViewBtn {
  id: SelectViewType;
  color: string;
  selected: boolean;
  onClick: (id: SelectViewType) => void;
}
const SelectViewBtn = ({ id, color, selected, onClick }: ISelectViewBtn) => {
  const onSelect = React.useCallback(() => onClick(id), [id, onClick]);
  return (
    <Btn
      tooltip={`Switch to ${getViewLabel(id)} layout`}
      selected={selected}
      color={color}
      icon={getViewIcon(id)}
      iconStyle={selected ? { color } : undefined}
      onClick={onSelect}
    />
  );
};

export default SelectViewBtn;
