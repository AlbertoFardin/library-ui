import * as React from "react";
import { createUseStyles } from "react-jss";
import { getTheme } from "../../../theme";
import Text from "../../../core/Text";
import Btn from "../../../core/Btn";
import Cell from "../Cell";
import { IPopoverListItem } from "../../../core/PopoverList";
import { ICellClick } from "../interfaces";

const useStyles = createUseStyles({
  cell: {
    "&:hover $btnCopy": {
      transform: "scale(1)",
    },
  },
  btnCopy: {
    transform: "scale(0)",
    marginLeft: 5,
  },
});

export interface ICellString {
  value: string;
  rowIndex: number;
  columnIndex: number;
  selected: boolean;
  disabled: boolean;
  highligh: boolean;
  style: React.CSSProperties;
  contextmenu: IPopoverListItem[];
  onClick: (p: ICellClick) => void;
  onContextMenu: (p: ICellClick) => void;
  onCopyToClipboard?: (text: string) => void;
}

const CellString = ({
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
  onCopyToClipboard,
}: ICellString) => {
  const classes = useStyles({});
  const cbBtnCopyToClipboard = React.useCallback(() => {
    onCopyToClipboard(value);
  }, [onCopyToClipboard, value]);

  return (
    <Cell
      className={classes.cell}
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
      <Text ellipsis children={value} />
      {disabled || !value || !onCopyToClipboard ? null : (
        <Btn
          color={getTheme().colors.msgInfo}
          className={classes.btnCopy}
          copyToClipboard={value}
          icon="content_copy"
          onClick={cbBtnCopyToClipboard}
          small
        />
      )}
    </Cell>
  );
};

export default CellString;
