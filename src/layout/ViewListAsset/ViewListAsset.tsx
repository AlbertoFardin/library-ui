import * as React from "react";
import { createUseStyles } from "react-jss";
import classnames from "classnames";
import Text from "../../core/Text";
import BtnBase, { IKeyDown } from "../../core/BtnBase";
import { getTheme } from "../../theme";
import AssetCheckbox from "../../core/AssetCheckbox";
import emptyFn from "../../utils/emptyFn";
import { PopoverOrigin } from "../../core/Popover";
import PopoverList, { IPopoverListItem } from "../../core/PopoverList";
import mixColors from "../../utils/mixColors";
import Preview, { IPreview } from "../../core/Preview";
import { isMobile } from "../../utils/deviceUtils";
import BtnContextmenu from "./BtnContextmenu";

interface IStyles {
  color: string;
  width: number;
  height: number;
}
const useStyles = createUseStyles({
  asset: {
    position: "relative",
    verticalAlign: "top",
    display: "flex",
    flexDirection: "row",
    overflow: "hidden",
    backgroundColor: getTheme().colors.background,
    alignItems: "center",
    boxSizing: "border-box",
    width: ({ width }: IStyles) => width,
    minWidth: ({ width }: IStyles) => width,
    maxWidth: ({ width }: IStyles) => width,
    height: ({ height }: IStyles) => height,
    minHeight: ({ height }: IStyles) => height,
    maxHeight: ({ height }: IStyles) => height,
    padding: "0 20px 0 10px",
  },
  assetMousehover: {
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
    backgroundColor: mixColors(
      0.3,
      getTheme().colors.background,
      getTheme().colors.grayBorder,
    ),
    zIndex: 1,
  },
  assetSelected: {
    backgroundColor: ({ color }: IStyles) =>
      mixColors(0.2, getTheme().colors.background, color),
    boxShadow: "none !important",
  },
  assetDisabled: {
    backgroundColor: getTheme().colors.grayBorder + " !important",
  },
});

export interface IViewListAsset {
  className?: string;
  style?: React.CSSProperties;
  color?: string;
  width: number;
  height: number;
  onCheck?: (e: React.MouseEvent, p: IKeyDown) => void;
  onClick?: (e: React.MouseEvent, p: IKeyDown) => void;
  onDoubleClick?: (e: React.MouseEvent, p: IKeyDown) => void;
  onContextMenu?: (e: React.MouseEvent, open: boolean) => void;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
  onLongPress?: (e: React.TouchEvent) => void;
  contextmenu?: IPopoverListItem[];
  contextmenuOriginAnchor?: PopoverOrigin;
  contextmenuOriginTransf?: PopoverOrigin;
  contextmenuPosizionZone?: 1 | 2 | 3 | 4;
  icon: string;
  label: string;
  disabled?: boolean;
  selected?: boolean;
  children?: React.ReactNode;
  checkbox?: "none" | "mousehover" | "always";
  preview?: IPreview;
}

const ViewListAsset = ({
  className,
  style,
  color = getTheme().colors.theme1,
  width,
  height,
  onCheck = emptyFn,
  onClick = emptyFn,
  onDoubleClick = emptyFn,
  onContextMenu = emptyFn,
  onMouseEnter = emptyFn,
  onMouseLeave = emptyFn,
  onLongPress,
  contextmenu = [],
  contextmenuOriginAnchor,
  contextmenuOriginTransf,
  contextmenuPosizionZone,
  icon,
  label,
  disabled,
  selected,
  children,
  checkbox = "mousehover",
  preview,
}: IViewListAsset) => {
  const classes = useStyles({ color, width, height });
  const [mouseHover, setMouseHover] = React.useState(false);
  const [menuCtx, setCtx] = React.useState([0, 0]);
  const cbMouseEnter = React.useCallback(
    (event: React.MouseEvent) => {
      if (isMobile()) return;
      setMouseHover(true);
      onMouseEnter(event);
    },
    [onMouseEnter],
  );
  const cbMouseLeave = React.useCallback(
    (event: React.MouseEvent) => {
      if (isMobile()) return;
      setMouseHover(false);
      onMouseLeave(event);
    },
    [onMouseLeave],
  );
  const cbContextMenu = React.useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();

      if (!selected) {
        const p: IKeyDown = {
          isMobile: isMobile(),
          keyDownCtrl: false,
          keyDownMeta: false,
        };
        onClick(event, p);
      }

      let menuOpen = false;
      if (contextmenu.length > 1) {
        setCtx([event.clientX, event.clientY]);
        menuOpen = true;
      }
      onContextMenu(event, menuOpen);
    },
    [contextmenu.length, onClick, onContextMenu, selected],
  );
  const cbMenuCtxClose = React.useCallback(
    (event: React.MouseEvent) => {
      setCtx([0, 0]);
      setMouseHover(false);
      onContextMenu(event, false);
    },
    [onContextMenu],
  );
  const cbMenuBtnOpen = React.useCallback(
    (event: React.MouseEvent) => {
      if (!selected) {
        const p: IKeyDown = {
          isMobile: isMobile(),
          keyDownCtrl: false,
          keyDownMeta: false,
        };
        onClick(event, p);
      }
      onContextMenu(event, true);
    },
    [onClick, onContextMenu, selected],
  );
  const cbMenuBtnClose = React.useCallback(() => {
    setMouseHover(false);
  }, []);
  const cbMouseMove = React.useCallback(() => {
    if (isMobile()) return;
    setMouseHover(true);
  }, []);
  const cbSingleActionClick = React.useCallback(
    (event: React.MouseEvent) => {
      cbContextMenu(event);
      const act = contextmenu[0];
      act.onClick(event, act.id);
    },
    [cbContextMenu, contextmenu],
  );

  return (
    <BtnBase
      disabled={disabled}
      color={color}
      style={style}
      className={classnames({
        [classes.asset]: true,
        [classes.assetMousehover]: !disabled && mouseHover,
        [classes.assetSelected]: selected,
        [classes.assetDisabled]: disabled,
        [className]: !!className,
      })}
      onClick={onClick}
      onContextMenu={cbContextMenu}
      onDoubleClick={onDoubleClick}
      onMouseEnter={cbMouseEnter}
      onMouseLeave={cbMouseLeave}
      onMouseMove={cbMouseMove}
      onLongPress={onLongPress}
      clickExclusive
    >
      <AssetCheckbox
        color={color}
        icon={icon}
        type={checkbox}
        selected={selected}
        disabled={disabled}
        mouseHover={mouseHover}
        onClick={onCheck}
      />
      {!preview ? null : (
        <Preview
          color={color}
          mousehover={mouseHover}
          onClick={onClick}
          onDoubleClick={onDoubleClick}
          {...preview}
          style={{
            marginRight: 10,
            backgroundColor: getTheme().colors.background,
            ...preview.style,
          }}
        />
      )}
      <Text style={{ flex: 1 }} ellipsis children={label} />
      {children}
      <BtnContextmenu
        disabled={disabled}
        color={color}
        contextmenu={contextmenu}
        onMenuOpen={cbMenuBtnOpen}
        onMenuHide={cbMenuBtnClose}
        onSingleActionClick={cbSingleActionClick}
      />
      <PopoverList
        open={!!menuCtx[0] || !!menuCtx[1]}
        onClose={cbMenuCtxClose}
        anchorReference="anchorPosition"
        anchorPosition={{
          top: menuCtx[1],
          left: menuCtx[0],
        }}
        originAnchor={contextmenuOriginAnchor}
        originTransf={contextmenuOriginTransf}
        positionZone={contextmenuPosizionZone}
        actions={contextmenu}
      />
    </BtnBase>
  );
};

export default ViewListAsset;
