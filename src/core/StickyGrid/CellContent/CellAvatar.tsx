import * as React from "react";
import Popover, { PopoverOrigin } from "../../Popover";
import drop from "lodash-es/drop";
import dropRight from "lodash-es/dropRight";
import floor from "lodash-es/floor";
import isEmpty from "lodash-es/isEmpty";
import { createUseStyles } from "react-jss";
import Badge from "./CellAvatarBadge";
import Chip from "../../Chip";
import Cell from "../Cell/Cell";
import { ICellClick } from "../interfaces";
import { IPopoverListItem } from "../../PopoverList";
import { getTheme } from "../../../theme";
import Avatar from "../../Avatar";

const originAnchor: PopoverOrigin = {
  vertical: "bottom",
  horizontal: "right",
};
const originTransf: PopoverOrigin = {
  vertical: "top",
  horizontal: "left",
};
const avatarMargin = 5;
const avatarSize = 45;
const useStyles = createUseStyles({
  container: {
    flex: 1,
    position: "relative",
    display: "inline-flex",
    overflow: "hidden",
  },
  badge: {
    top: "50%",
    right: 2,
    transform: "translateY(-100%)",
  },
});

interface IAvatar {
  id: string;
  src: string;
  text?: string;
  tooltip?: string;
}

export interface ICellAvatar {
  value: IAvatar[] | string;
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

const CellAvatar = ({
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
}: ICellAvatar) => {
  const classes = useStyles({});
  const contentRef = React.useRef(null);
  const [popover, setPopover] = React.useState(false);
  const cellWidth = Number(style.width);
  const items: IAvatar[] =
    typeof value === "string" ? [{ id: "avatar", src: value }] : value;
  const itemsVisibled = dropRight(
    items,
    items.length - floor(cellWidth / avatarSize),
  );
  const itemsNotVisibled =
    items.length - itemsVisibled.length > 0
      ? drop(items, itemsVisibled.length)
      : [];
  const onMenuOpen = React.useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    setPopover(true);
  }, []);
  const onMenuClose = React.useCallback(() => {
    setPopover(false);
  }, []);

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
      <div ref={contentRef} className={classes.container}>
        {itemsVisibled.map(({ id, tooltip, src, text }: IAvatar) => (
          <Avatar
            key={id}
            tooltip={tooltip}
            style={{ marginRight: avatarMargin }}
            size={avatarSize - avatarMargin}
            src={src}
            text={text}
          />
        ))}
        <Badge
          open={!isEmpty(itemsNotVisibled)}
          onClick={onMenuOpen}
          className={classes.badge}
          children={`+${itemsNotVisibled.length}`}
        />
      </div>
      <Popover
        open={popover}
        anchorEl={contentRef.current}
        originAnchor={originAnchor}
        originTransf={originTransf}
        style={{ padding: 10 }}
        onClose={onMenuClose}
      >
        {itemsNotVisibled.map(({ id, tooltip, src, text }: IAvatar) => (
          <div key={id} className={classes.container}>
            <Chip
              selected
              id={id}
              label={tooltip}
              color={getTheme().colors.theme1}
              avatar={src}
              avatarText={text}
            />
          </div>
        ))}
      </Popover>
    </Cell>
  );
};

export default CellAvatar;
