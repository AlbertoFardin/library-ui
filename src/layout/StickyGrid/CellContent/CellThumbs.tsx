import * as React from "react";
import { FixedSizeGrid } from "react-window";
import { createUseStyles } from "react-jss";
import Thumb from "./CellThumbsItem";
import Cell from "../Cell";
import { ICellClick, IThumbnail } from "../interfaces";
import { IPopoverListItem } from "../../../core/PopoverList";
import { columnsPadding } from "../statics";

export const getThumbSize = (size: number): number => size * 0.7;
export const getThumbMargin = (size: number): number => size / 30;

const useStyles = createUseStyles({
  cellThumbnails: {
    overflowY: "hidden !important",
    overflowX: "overlay !important",
    borderRight: "1px solid transparent",
    borderLeft: "1px solid transparent",
    boxSizing: "border-box",
    "&:hover": {
      borderColor: "#eee",
    },
  },
});

export interface ICellThumbs {
  value: IThumbnail[];
  columnIndex: number;
  rowIndex: number;
  selected: boolean;
  disabled: boolean;
  highligh: boolean;
  style: React.CSSProperties;
  onClick: (p: ICellClick) => void;
  onContextMenu: (p: ICellClick) => void;
  contextmenu: IPopoverListItem[];
  thumbnailSize?: number;
  loading?: boolean;
}

const CellThumbs = ({
  value,
  columnIndex,
  rowIndex,
  selected,
  disabled,
  highligh,
  style,
  onClick,
  onContextMenu,
  contextmenu,
  thumbnailSize,
  loading,
}: ICellThumbs) => {
  const classes = useStyles({});
  const height = Number(style.height) || 0;
  const width = (Number(style.width) || 0) - columnsPadding * 2;
  const thumbSize = thumbnailSize || getThumbSize(height);
  const thumbMargin = getThumbMargin(height);

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
      <FixedSizeGrid
        className={classes.cellThumbnails}
        columnCount={value.length}
        columnWidth={thumbSize + thumbMargin * 2}
        height={height}
        width={width}
        rowCount={1}
        rowHeight={height - 10}
        itemData={{
          columnIndex,
          rowIndex,
          thumbs: value,
          thumbSize,
          thumbMargin,
          selected,
          disabled,
          highligh,
          onClick,
          loading,
        }}
        children={Thumb}
      />
    </Cell>
  );
};

export default CellThumbs;
