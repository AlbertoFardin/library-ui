import * as React from "react";
import { createUseStyles } from "react-jss";
import classnames from "classnames";
import { columnsPadding } from "../statics";
import { ICellClick } from "../interfaces";
import PopoverList, { IPopoverListItem } from "../../../core/PopoverList";
import mixColors from "../../../utils/mixColors";
import emptyFn from "../../../utils/emptyFn";
import { getTheme } from "../../../theme";
import BtnBase, { IKeyDown } from "../../../core/BtnBase";

interface IStyles {
  selected: boolean;
  disabled: boolean;
  highligh: boolean;
  rowIndex: number;
}
const useStyles = createUseStyles({
  cell: {
    position: "absolute",
    cursor: "pointer",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    verticalAlign: "middle",
    overflow: "hidden",
    padding: `0 ${columnsPadding}px`,
    boxSizing: "border-box",
    borderTop: `1px solid ${getTheme().colors.background}`,
    borderBottom: `1px solid ${getTheme().colors.background}`,
    borderColor: ({ highligh }: IStyles) => {
      if (highligh) return getTheme().colors.theme1;
      return "transparent";
    },
    backgroundColor: ({ rowIndex, selected }: IStyles) => {
      if (selected) {
        return mixColors(
          0.8,
          getTheme().colors.theme1,
          getTheme().colors.background,
        );
      }
      const disp = mixColors(
        getTheme().colors.isDark ? 0.03 : 0.97,
        "#000000",
        "#ffffff",
      );

      return rowIndex % 2 === 0 ? disp : getTheme().colors.background;
    },
  },
  cellDisabled: {
    backgroundColor: getTheme().colors.disable + " !important",
  },
});

interface IMenu {
  top: number;
  left: number;
}
const menuDefault: IMenu = {
  top: 0,
  left: 0,
};

export interface ICell {
  rowIndex: number;
  columnIndex: number;
  selected: boolean;
  disabled: boolean;
  highligh: boolean;
  style?: React.CSSProperties;
  className?: string;
  onClick?: (p: ICellClick) => void;
  onDoubleClick?: (p: ICellClick) => void;
  onContextMenu?: (p: ICellClick) => void;
  contextmenu?: IPopoverListItem[];
  children: JSX.Element | React.ReactNode;
}

const Cell = ({
  style,
  className,
  rowIndex,
  columnIndex,
  selected,
  disabled,
  highligh,
  onClick = emptyFn,
  onContextMenu = emptyFn,
  contextmenu = [],
  children,
}: ICell) => {
  const [menu, setMenu] = React.useState(menuDefault as IMenu);
  const classes = useStyles({
    selected,
    disabled,
    highligh,
    rowIndex,
  });
  const cbClick = React.useCallback(
    (_, { keyDownCtrl, keyDownMeta }: IKeyDown) => {
      const clickProps: ICellClick = {
        eventDetail: 1,
        columnIndex,
        rowIndex,
        selected,
        highligh,
        keyDownCtrl,
        keyDownMeta,
      };
      onClick(clickProps);
    },
    [columnIndex, highligh, onClick, rowIndex, selected],
  );
  const cbDoubleClick = React.useCallback(
    (_, { keyDownCtrl, keyDownMeta }: IKeyDown) => {
      const clickProps: ICellClick = {
        eventDetail: 2,
        columnIndex,
        rowIndex,
        selected,
        highligh,
        keyDownCtrl,
        keyDownMeta,
      };
      onClick(clickProps);
    },
    [columnIndex, highligh, onClick, rowIndex, selected],
  );
  const cbContextMenu = React.useCallback(
    ({ clientY, clientX }: React.MouseEvent) => {
      setMenu({ top: clientY, left: clientX });
      onContextMenu({
        eventDetail: 0,
        columnIndex,
        rowIndex,
        selected,
        highligh,
        keyDownCtrl: false,
        keyDownMeta: false,
      });
    },
    [columnIndex, highligh, onContextMenu, rowIndex, selected],
  );
  const cbMenuClose = React.useCallback(() => {
    setMenu(menuDefault);
  }, []);

  if (!style?.width || !style?.height) return null;

  return (
    <BtnBase
      style={style}
      className={classnames({
        [classes.cell]: true,
        [classes.cellDisabled]: disabled,
        [className]: !!className,
      })}
      disabled={disabled}
      disabledRipple
      onClick={cbClick}
      onDoubleClick={cbDoubleClick}
      onContextMenu={cbContextMenu}
      clickExclusive
    >
      {children}
      {!contextmenu.length ? null : (
        <PopoverList
          open={!!menu.top && !!menu.left}
          onClose={cbMenuClose}
          anchorReference="anchorPosition"
          anchorPosition={menu}
          actions={contextmenu}
        />
      )}
    </BtnBase>
  );
};

export default Cell;
