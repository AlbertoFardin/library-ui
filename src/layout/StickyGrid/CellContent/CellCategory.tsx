import * as React from "react";
import Cell from "../Cell/Cell";
import Chip from "../../../core/Chip";
import { ICellClick } from "../interfaces";
import { IPopoverListItem } from "../../../core/PopoverList";
import { getTheme } from "../../../theme";

const styleLess: React.CSSProperties = {
  flex: 1,
  position: "relative",
  display: "inline-flex",
  flexDirection: "column",
  alignItems: "flex-start",
};
const styleMore: React.CSSProperties = {
  flex: 1,
  height: "100%",
  position: "relative",
  padding: "5px 0",
  boxSizing: "border-box",
  overflowY: "auto",
};

export interface ICellCategory {
  value: { id: string; label: string; color: string; tooltip: string }[];
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

const CellCategory = ({
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
}: ICellCategory) => {
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
      <div style={(value || []).length < 3 ? styleLess : styleMore}>
        {(value || []).map((c) => (
          <Chip
            selected
            key={c.id}
            {...c}
            color={c.color || getTheme().colors.theme1}
          />
        ))}
      </div>
    </Cell>
  );
};

export default CellCategory;
