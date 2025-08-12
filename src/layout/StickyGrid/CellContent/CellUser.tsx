import * as React from "react";
import { createUseStyles } from "react-jss";
import Btn from "../../../core/Btn";
import Text from "../../../core/Text";
import { getTheme } from "../../../theme";
import Avatar from "../../../core/Avatar";
import Cell from "../Cell";
import { ICellClick, ICellRenderer, ICellUserData } from "../interfaces";
import { IPopoverListItem } from "../../../core/PopoverList";

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

interface ICellUser extends ICellRenderer {
  value: string;
  columnIndex: number;
  rowIndex: number;
  selected: boolean;
  disabled: boolean;
  highligh: boolean;
  style: React.CSSProperties;
  onClick: (p: ICellClick) => void;
  onContextMenu: (p: ICellClick) => void;
  contextmenu: IPopoverListItem[];
  getUser: (userId: string) => ICellUserData;
}
const CellUser = ({
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
  getUser,
}: ICellUser) => {
  const classes = useStyles({});
  const { name, avatar, avatarText, avatarIcon } = getUser(value);
  const cbBtnCopyToClipboard = React.useCallback(() => {
    onCopyToClipboard(name);
  }, [name, onCopyToClipboard]);

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
      <Avatar
        style={{ marginRight: 5, fontSize: 15 }}
        size={40}
        src={avatar}
        text={avatarText}
        icon={avatarIcon}
      />
      <Text ellipsis children={name} />
      <Btn
        color={getTheme().colors.msgInfo}
        className={classes.btnCopy}
        copyToClipboard={name}
        icon="content_copy"
        onClick={cbBtnCopyToClipboard}
        small
      />
    </Cell>
  );
};

export default CellUser;
