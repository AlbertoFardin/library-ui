import * as React from "react";
import Icon from "../../../core/Icon";
import Cell from "../Cell/Cell";
import { ICellClick } from "../interfaces";
import { IPopoverListItem } from "../../../core/PopoverList";
import { getTheme } from "../../../theme";

export interface ICellIcon {
  value: string;
  rowIndex: number;
  columnIndex: number;
  selected: boolean;
  disabled: boolean;
  highligh: boolean;
  style: React.CSSProperties;
  onClick: (p: ICellClick) => void;
  onContextMenu: (p: ICellClick) => void;
  contextmenu: IPopoverListItem[];
}

const CellIcon = ({
  value,
  rowIndex,
  columnIndex,
  selected,
  disabled,
  highligh,
  style,
  onClick,
  onContextMenu,
  contextmenu,
}: ICellIcon) => {
  return (
    <Cell
      rowIndex={rowIndex}
      columnIndex={columnIndex}
      selected={selected}
      disabled={disabled}
      highligh={highligh}
      style={style}
      contextmenu={contextmenu}
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      <Icon style={{ color: getTheme().colors.theme1 }} children={value} />
    </Cell>
  );
};

export default CellIcon;
