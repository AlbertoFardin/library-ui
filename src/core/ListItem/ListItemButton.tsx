import * as React from "react";
import Btn from "../Btn";

export interface IListItemButton {
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  icon?: string;
  emoji?: string;
  label?: string;
  avatar?: string;
  id: string;
  disabled?: boolean;
  tooltip?: string | string[];
  onClick?: (event: React.MouseEvent, parentId: string, id: string) => void;
}

interface IListItemButtonCmp extends IListItemButton {
  parentId: string;
}

const ListItemButton = (b: IListItemButtonCmp) => {
  const { onClick, parentId, id, disabled } = b;
  const onCbClick = React.useCallback(
    (event) => {
      if (!disabled && !!onClick) {
        event.stopPropagation();
        onClick(event, parentId, id);
      }
    },
    [disabled, id, onClick, parentId],
  );

  return <Btn {...b} onClick={onCbClick} />;
};

export default ListItemButton;
