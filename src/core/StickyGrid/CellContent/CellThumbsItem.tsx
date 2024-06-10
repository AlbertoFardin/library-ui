import * as React from "react";
import classnames from "classnames";
import { createUseStyles } from "react-jss";
import Preview from "../../Preview";
import { ICellClick, IThumbnail } from "../interfaces";
import { getTheme } from "../../../theme";

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
    backgroundColor: getTheme().colors.grayDrawer,
    border: `1px solid ${getTheme().colors.grayBorder}`,
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
  } = data;
  const {
    Button,
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
  }: IThumbnail = thumbs[index];
  const classes = useStyles({
    thumbMargin,
    thumbSize,
  });

  const [mousehover, setMousehover] = React.useState(false);
  const cbClick = React.useCallback(
    (event, { keyDownCtrl, keyDownMeta }) => {
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
  const cbDoubleClick = React.useCallback(
    (event, { keyDownCtrl, keyDownMeta }) => {
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
  const onMouseEnter = React.useCallback(() => setMousehover(true), []);
  const onMouseLeave = React.useCallback(() => setMousehover(false), []);

  return (
    <div style={styleCell}>
      <div
        style={style}
        className={classnames({
          [classes.thumb]: true,
          [className]: !!className,
        })}
        onMouseEnter={!Button ? undefined : onMouseEnter}
        onMouseLeave={!Button ? undefined : onMouseLeave}
      >
        {!Button ? null : (
          <Button
            disabled={disabled}
            onClick={cbClick}
            onDoubleClick={cbDoubleClick}
            columnIndex={columnIndex}
            rowIndex={rowIndex}
            selected={selected}
            highligh={highligh}
            thumbSize={thumbSize}
            thumbMargin={thumbMargin}
            thumbId={id}
            thumbMimeType={previewMimeType}
            thumbSrcUrl={previewSrcUrl}
            mousehover={mousehover}
            setMousehover={setMousehover}
          />
        )}
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
          mousehover={mousehover}
        />
      </div>
    </div>
  );
};

export default CellThumbsItem;
