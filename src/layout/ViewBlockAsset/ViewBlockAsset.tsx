import * as React from "react";
import { createUseStyles } from "react-jss";
import classnames from "classnames";
import Text from "../../core/Text";
import Btn from "../../core/Btn";
import BtnBase, { IKeyDown } from "../../core/BtnBase";
import Preview from "../../core/Preview";
import { getTheme } from "../../theme";
import AssetCheckbox from "../../core/AssetCheckbox";
import emptyFn from "../../utils/emptyFn";
import PopoverList from "../../core/PopoverList";
import mixColors from "../../utils/mixColors";
import { isMobile } from "../../utils/deviceUtils";
import Toolbar from "../../core/Toolbar";
import Icon from "../../core/Icon";
import { IViewBlockAsset } from "./types";

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
  assetToolbar: {
    padding: "0 10px 0 0",
  },
  asset2: {
    backgroundColor: getTheme().colors.background,
    borderColor: "#A09F9F",
  },
  asset2Selected: {
    borderWidth: 3,
  },
  preview1: {
    margin: "0 10px 10px 10px",
    backgroundColor: getTheme().colors.background,
  },
  preview2: {
    //
  },
  icon: {
    fontSize: 20,
    margin: 10,
    color: "rgb(160, 160, 160)",
  },
  toolbarLayout2: {
    height: "40px !important",
    minHeight: "40px !important",
  },
  toolbarLayout2Header: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
  },
});

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
  onLongPress,
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
  labelAdornment,
  layout = 1,
}: IViewBlockAsset) => {
  const classes = useStyles({ color, width });
  const [mouseHover, setMouseHover] = React.useState(false);
  const [menuCtx, setCtx] = React.useState([0, 0]);
  const [menuBtn, setMenuBtn] = React.useState(false);

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

      let menu = false;
      if (contextmenu.length > 1) {
        setCtx([event.clientX, event.clientY]);
        menu = true;
      }
      onContextMenu(event, menu);
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
      setMenuBtn(true);
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
    setMenuBtn(false);
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
  const toolbarComponents = (
    <>
      <Text style={{ flex: 1 }} ellipsis children={label} />
      {labelAdornment}
      {contextmenu.length !== 1 ? null : (
        <Btn
          style={{ margin: 0 }}
          disabled={disabled}
          color={color}
          icon={contextmenu[0].icon}
          tooltip={contextmenu[0].label}
          onClick={cbSingleActionClick}
        />
      )}
      {contextmenu.length < 2 ? null : (
        <Btn
          style={{ margin: 0 }}
          disabled={disabled}
          color={color}
          icon="more_vert"
          onClick={cbMenuBtnOpen}
          menu={{
            items: contextmenu,
            onClose: cbMenuBtnClose,
          }}
        />
      )}
    </>
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
        [classes.assetMenuOpen]: menuBtn || !!menuCtx[0] || !!menuCtx[1],
        [classes.asset2]: layout === 2,
        [classes.asset2Selected]: layout === 2 && selected,
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
      <Toolbar
        className={classnames({
          [classes.assetToolbar]: true,
          [classes.toolbarLayout2Header]: layout === 2,
          [classes.toolbarLayout2]: layout === 2,
        })}
      >
        <AssetCheckbox
          color={color}
          icon={layout === 1 ? icon : null}
          type={checkbox}
          selected={selected}
          disabled={disabled}
          mouseHover={mouseHover}
          onClick={onCheck}
        />
        {layout === 1 && toolbarComponents}
      </Toolbar>
      {layout === 2 && children}
      {!preview ? null : (
        <Preview
          disabled={disabled}
          color={color}
          mousehover={mouseHover}
          onClick={onClick}
          onDoubleClick={onDoubleClick}
          className={classnames({
            [classes.preview1]: layout === 1,
            [classes.preview2]: layout === 2,
            [preview.className]: !!preview.className,
          })}
          objectFit={layout === 2 ? "cover" : undefined}
          {...preview}
        />
      )}
      {layout === 2 && (
        <Toolbar
          className={classnames({
            [classes.assetToolbar]: true,
            [classes.toolbarLayout2]: layout === 2,
          })}
        >
          <Icon className={classes.icon} children={icon} />
          {toolbarComponents}
        </Toolbar>
      )}
      {layout === 1 && children}
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
