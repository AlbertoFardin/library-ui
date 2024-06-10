import * as React from "react";
import { createUseStyles } from "react-jss";
import Text from "../../Text";
import Btn from "../../Btn";
import classnames from "classnames";
import BtnBase, { IKeyDown } from "../../BtnBase";
import Preview, { IPreview } from "../../Preview";
import { getTheme } from "../../../theme";
import AssetCheckbox from "../../AssetCheckbox";
import emptyFn from "../../../utils/emptyFn";
import PopoverList, { IPopoverListItem } from "../../PopoverList";
import mixColors from "../../../utils/mixColors";
import { PopoverOrigin } from "../../Popover";
import { isMobile } from "../../../utils/deviceUtils";

interface IStyles {
  color: string;
  width: number;
}
const useStyles = createUseStyles({
  asset: {
    position: "relative",
    verticalAlign: "top",
    display: "inline-flex",
    flexDirection: "column",
    overflow: "hidden",
    border: "1px solid transparent",
    backgroundColor: mixColors(
      0.3,
      getTheme().colors.background,
      getTheme().colors.grayBorder,
    ),
    boxSizing: "content-box",
    borderRadius: getTheme().borderRadius,
    alignItems: "stretch",
    transition: "250ms all",
    width: ({ width }: IStyles) => width,
    minWidth: ({ width }: IStyles) => width,
    maxWidth: ({ width }: IStyles) => width,
  },
  assetMousehover: {
    borderColor: getTheme().colors.grayBorder,
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
  },
  assetSelected: {
    borderColor: ({ color }: IStyles) => color,
    backgroundColor: ({ color }: IStyles) =>
      mixColors(0.2, getTheme().colors.background, color),
    boxShadow: "none !important",
  },
  assetMenuOpen: {
    borderColor: ({ color }: IStyles) => color,
  },
  assetDisabled: {
    backgroundColor: getTheme().colors.grayBorder + " !important",
  },
  assetBase: {
    height: 40,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  preview: {
    backgroundColor: getTheme().colors.background,
    margin: "0 10px 10px 10px",
    alignSelf: "center",
  },
});

export interface IViewBlockAsset {
  className?: string;
  style?: React.CSSProperties;
  color?: string;
  width: number;
  onCheck?: (e: React.MouseEvent, p: IKeyDown) => void;
  onClick?: (e: React.MouseEvent, p: IKeyDown) => void;
  onDoubleClick?: (e: React.MouseEvent, p: IKeyDown) => void;
  onContextMenu?: (e: React.MouseEvent, p: IKeyDown, open: boolean) => void;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
  preview?: IPreview;
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
}

const ViewBlockAsset = ({
  className,
  style,
  color = getTheme().colors.theme1,
  width,
  onCheck = emptyFn,
  onClick = emptyFn,
  onDoubleClick = emptyFn,
  onContextMenu = emptyFn,
  onMouseEnter = emptyFn,
  onMouseLeave = emptyFn,
  preview,
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
}: IViewBlockAsset) => {
  const classes = useStyles({ color, width });
  const [mouseHover, setMouseHover] = React.useState(false);
  const [menuCtx, setCtx] = React.useState([0, 0]);
  const [menuBtn, setMenuBtn] = React.useState(false);

  const cbMouseEnter = React.useCallback(
    (event: React.MouseEvent) => {
      setMouseHover(true);
      onMouseEnter(event);
    },
    [onMouseEnter],
  );
  const cbMouseLeave = React.useCallback(
    (event: React.MouseEvent) => {
      setMouseHover(false);
      onMouseLeave(event);
    },
    [onMouseLeave],
  );
  const cbMenuCtxOpen = React.useCallback(
    (event: React.MouseEvent, keyDown: IKeyDown) => {
      event.preventDefault();
      event.stopPropagation();
      let menu = false;
      if (!!contextmenu.length) {
        setCtx([event.clientX, event.clientY]);
        menu = true;
      }
      onContextMenu(event, keyDown, menu);
    },
    [contextmenu.length, onContextMenu],
  );
  const cbMenuCtxClose = React.useCallback(
    (event: React.MouseEvent) => {
      setCtx([0, 0]);
      setMouseHover(false);
      const open = false;
      const keyDown: IKeyDown = {
        keyDownCtrl: false,
        keyDownMeta: false,
        isMobile: isMobile(),
      };
      onContextMenu(event, keyDown, open);
    },
    [onContextMenu],
  );
  const cbMenuBtnOpen = React.useCallback(
    (event: React.MouseEvent) => {
      setMenuBtn(true);
      const open = true;
      const keyDown: IKeyDown = {
        keyDownCtrl: false,
        keyDownMeta: false,
        isMobile: isMobile(),
      };
      onContextMenu(event, keyDown, open);
    },
    [onContextMenu],
  );
  const cbMenuBtnClose = React.useCallback(() => {
    setMenuBtn(false);
    setMouseHover(false);
  }, []);
  const cbMouseMove = React.useCallback(() => {
    setMouseHover(true);
  }, []);

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
        [classes.assetMenuOpen]: menuBtn || !!menuCtx[0] || !!menuCtx[1],
        [className]: !!className,
      })}
      onClick={onClick}
      onContextMenu={cbMenuCtxOpen}
      onDoubleClick={onDoubleClick}
      onMouseEnter={cbMouseEnter}
      onMouseLeave={cbMouseLeave}
      onMouseMove={cbMouseMove}
      clickExclusive
    >
      <div className={classes.assetBase}>
        <AssetCheckbox
          color={color}
          icon={icon}
          type={checkbox}
          selected={selected}
          disabled={disabled}
          mouseHover={mouseHover}
          onClick={onCheck}
        />
        <Text style={{ flex: 1 }} ellipsis children={label} />
        {!contextmenu.length ? null : (
          <Btn
            disabled={disabled}
            color={color}
            icon="more_vert"
            style={{ margin: "0 5px 0 0" }}
            onClick={cbMenuBtnOpen}
            menu={{
              items: contextmenu,
              onClose: cbMenuBtnClose,
            }}
          />
        )}
      </div>
      {!preview ? null : (
        <Preview
          disabled={disabled}
          color={color}
          mousehover={mouseHover}
          onClick={onClick}
          onDoubleClick={onDoubleClick}
          className={classnames({
            [classes.preview]: true,
            [preview.className]: !!preview.className,
          })}
          {...preview}
        />
      )}
      {children}
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

export default ViewBlockAsset;
