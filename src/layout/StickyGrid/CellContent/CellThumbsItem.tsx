import * as React from "react";
import classnames from "classnames";
import { createUseStyles } from "react-jss";
import Preview, { getPreviewBackgroundColor } from "../../../core/Preview";
import { ICellClick, IThumbnail } from "../interfaces";
import { getTheme } from "../../../theme";
import BtnBase from "../../../core/BtnBase";
import PopoverList from "../../../core/PopoverList";
import Text from "../../../core/Text";
import hexToRgbA from "../../../utils/hexToRgbA";
import Tooltip from "../../../core/Tooltip";
import Icon from "../../../core/Icon";

interface IStyles {
  thumbSize: number;
  thumbMargin: number;
}
const useStyles = createUseStyles({
  thumb: {
    position: "relative",
    height: ({ thumbSize }: IStyles) => thumbSize,
    width: ({ thumbSize }: IStyles) => thumbSize,
    margin: ({ thumbMargin }: IStyles) =>
      `${thumbMargin + 10}px ${thumbMargin}px ${thumbMargin}px`,
    borderRadius: getTheme().borderRadius,
    backgroundColor: getPreviewBackgroundColor(),
    border: `1px solid ${getTheme().colors.grayBorder}`,
  },
  thumbMenuOpen: {
    borderColor: getTheme().colors.theme1,
  },
  overlay: {
    zIndex: 1,
    position: "absolute",
    backgroundColor: hexToRgbA(getTheme().colors.theme1, 0.35),
    display: "flex",
    flexDirection: "column",
    height: ({ thumbSize }: IStyles) => thumbSize,
    width: ({ thumbSize }: IStyles) => thumbSize,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: getTheme().borderRadius - 1,
  },
  overlayIcon: {
    color: "#ffffff",
    fontSize: ({ thumbSize }: IStyles) => thumbSize / 4,
  },
  overlayText: {
    color: "#ffffff",
    maxWidth: ({ thumbSize }: IStyles) => thumbSize - 30,
  },
});

interface ICellThumbsItem {
  style: React.CSSProperties;
  columnIndex: number;
  data: {
    columnIndex: number;
    rowIndex: number;
    thumbs: IThumbnail[];
    thumbSize: number;
    thumbMargin: number;
    selected: boolean;
    disabled: boolean;
    highligh: boolean;
    onClick: (p: ICellClick) => void;
    loading: boolean;
  };
}

const CellThumbsItem = ({
  style: styleCell,
  data,
  columnIndex: index,
}: ICellThumbsItem) => {
  const {
    columnIndex,
    rowIndex,
    thumbs,
    thumbSize,
    thumbMargin,
    selected,
    disabled,
    highligh,
    onClick,
    loading,
  } = data;
  const {
    style,
    className,
    id,
    placeholderLabel,
    placeholderLabelStyle,
    placeholderLabelRequired,
    placeholderIcon,
    placeholderIconStyle,
    previewStyle,
    previewClassName,
    previewSrcUrl,
    previewMimeType,
    previewMouseSensitive,
    children,
    overlay,
    contextmenu = {},
  }: IThumbnail = thumbs[index];
  const classes = useStyles({
    thumbMargin,
    thumbSize,
  });

  const [mousehover, setMousehover] = React.useState(false);
  const [menuCoords, setMenuCoords] = React.useState([0, 0]);
  const menuOpen = !!menuCoords[0] || !!menuCoords[1];

  const onMouseEnter = React.useCallback(() => setMousehover(true), []);
  const onMouseLeave = React.useCallback(() => setMousehover(false), []);
  const cbOnThumbClick1 = React.useCallback(
    (_, { keyDownCtrl, keyDownMeta }) => {
      const clickProps: ICellClick = {
        eventDetail: 1,
        thumbId: id,
        columnIndex,
        rowIndex,
        selected,
        highligh,
        keyDownCtrl,
        keyDownMeta,
      };
      onClick(clickProps);
    },
    [columnIndex, highligh, id, onClick, rowIndex, selected],
  );
  const cbOnThumbClick2 = React.useCallback(
    (_, { keyDownCtrl, keyDownMeta }) => {
      const clickProps: ICellClick = {
        eventDetail: 2,
        thumbId: id,
        columnIndex,
        rowIndex,
        selected,
        highligh,
        keyDownCtrl,
        keyDownMeta,
      };
      onClick(clickProps);
    },
    [columnIndex, highligh, id, onClick, rowIndex, selected],
  );
  const cbOnContextMenuOpen = React.useCallback(
    (event) => {
      if (!contextmenu.items) return;
      setMenuCoords([event.clientX, event.clientY]);
    },
    [contextmenu.items],
  );
  const cbOnContextMenuHide = React.useCallback(() => {
    setMenuCoords([0, 0]);
    setMousehover(false);
  }, []);

  return (
    <div style={styleCell}>
      <BtnBase
        style={style}
        className={classnames({
          [classes.thumb]: true,
          [classes.thumbMenuOpen]: menuOpen,
          [className]: !!className,
        })}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={cbOnThumbClick1}
        onDoubleClick={cbOnThumbClick2}
        onContextMenu={cbOnContextMenuOpen}
        disabled={disabled}
        clickExclusive
      >
        {loading ? null : (
          <>
            {children}
            {mousehover && !!overlay ? (
              <Tooltip title={overlay.tooltip}>
                <div className={classes.overlay}>
                  <Icon
                    className={classes.overlayIcon}
                    children={overlay.icon}
                  />
                  <Text
                    className={classes.overlayText}
                    ellipsis
                    size={2}
                    children={overlay.text}
                  />
                </div>
              </Tooltip>
            ) : null}
            {!!contextmenu.items ? (
              <PopoverList
                open={menuOpen}
                onClose={cbOnContextMenuHide}
                anchorPosition={{
                  left: menuCoords[0],
                  top: menuCoords[1],
                }}
                title={contextmenu.title}
                actions={contextmenu.items}
                originAnchor={contextmenu.originAnchor}
                originTransf={contextmenu.originTransf}
              />
            ) : null}
            <Preview
              className={previewClassName}
              style={previewStyle}
              previewHeight={thumbSize}
              previewWidth={thumbSize}
              placeholderIcon={placeholderIcon}
              placeholderIconStyle={placeholderIconStyle}
              placeholderLabel={placeholderLabel}
              placeholderLabelRequired={placeholderLabelRequired}
              placeholderLabelStyle={placeholderLabelStyle}
              srcUrl={previewSrcUrl}
              mimeType={previewMimeType}
              mousehover={mousehover && previewMouseSensitive}
            />
          </>
        )}
      </BtnBase>
    </div>
  );
};

export default CellThumbsItem;
