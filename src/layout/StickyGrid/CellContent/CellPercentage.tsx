import * as React from "react";
import { createUseStyles } from "react-jss";
import Text from "../../../core/Text";
import Cell from "../Cell";
import { IPopoverListItem } from "../../../core/PopoverList";
import { ICellClick } from "../interfaces";
import TypeCell from "../TypeCell";
import getValueString from "../getValueString";
import mixColors from "../../../utils/mixColors";
import { getTheme } from "../../../theme";

const width = 120;
const height = 20;
const getColor = (v: number) => {
  if (v === 0 || (v > 0 && v < 25)) return "#ff6384";
  if (v > 24 && v < 75) return "#ff9f40";
  if (v > 74 && v < 99) return "#ffce56";
  return "#4bc0c0";
};

interface IStyles {
  value: number;
  color1: string;
  color2: string;
}
const useStyles = createUseStyles({
  bar: {
    position: "relative",
    border: ({ color1 }: IStyles) => `1px solid ${color1}`,
    width,
    minWidth: width,
    maxWidth: width,
    height,
    minHeight: height,
    maxHeight: height,
    borderRadius: 2,
    textAlign: "center",
    backgroundColor: ({ color2 }: IStyles) => color2,
  },
  barText: {
    position: "absolute",
    inset: 0,
    margin: "auto",
    width: "fit-content",
    height: "fit-content",
    padding: "0 6px",
    borderRadius: 2,
    lineHeight: "16px",
    backgroundColor: ({ value, color2 }: IStyles) => {
      if (value < 70) return color2;
      return "transparent";
    },
    color: ({ value, color1 }: IStyles) => {
      if (value < 70) return color1;
      return "#fff";
    },
  },
  barContent: {
    backgroundColor: ({ color1 }: IStyles) => color1,
    width: ({ value }: IStyles) => (value * width) / 100,
    height: "inherit",
  },
});

export interface ICellPercentage {
  value: number;
  rowIndex: number;
  columnIndex: number;
  selected: boolean;
  disabled: boolean;
  highligh: boolean;
  style: React.CSSProperties;
  contextmenu: IPopoverListItem[];
  onClick: (p: ICellClick) => void;
  onContextMenu: (p: ICellClick) => void;
}

const CellPercentage = ({
  value,
  rowIndex,
  columnIndex,
  selected,
  disabled,
  highligh,
  style,
  contextmenu,
  onClick,
  onContextMenu,
}: ICellPercentage) => {
  const color1 = getColor(value);
  const color2 = mixColors(0.85, color1, getTheme().colors.background);
  const classes = useStyles({ value, color1, color2 });

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
      <div className={classes.bar}>
        <Text
          size={2}
          className={classes.barText}
          children={getValueString(value, TypeCell.Percentage)}
        />
        <div className={classes.barContent} />
      </div>
    </Cell>
  );
};

export default CellPercentage;
