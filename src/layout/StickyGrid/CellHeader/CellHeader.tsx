import * as React from "react";
import classnames from "classnames";
import ReactResizeDetector from "react-resize-detector";
import { v4 as uuidv4 } from "uuid";
import Text from "../../../core/Text";
import { ISort, ISortOrder } from "../../../interfaces";
import useStyles from "./useStyles";
import IconSort from "./IconSort";
import Btn from "../../../core/Btn";
import { getIndexSort, arrowSortAction } from "./utils";
import { IRenderer, IStickTableRow } from "../../../core/StickyTable";
import emptyFn from "../../../utils/emptyFn";
import IconDrag from "../../../core/IconDrag";
import { getTheme } from "../../../theme";

const dragEventId = `cellheader_drag_${uuidv4()}`;
const useDebounce = (value: number, delay: number): number => {
  const [inputValue, setInputValue] = React.useState(value);
  React.useEffect(() => {
    const handler = setTimeout(() => {
      setInputValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [delay, value]);
  return inputValue;
};

enum ACTION {
  DRAG_HOVER = "DRAG_HOVER",
  DRAG_ID = "DRAG_ID",
  RESIZE = "RESIZE",
  MOUSEHOVER = "MOUSEHOVER",
}

interface IReducer {
  hoverDrag: boolean;
  cellDragId: string;
  dragWidth: number;
  mousehover: boolean;
}

const reducerInit: IReducer = {
  hoverDrag: false,
  cellDragId: "",
  dragWidth: 0,
  mousehover: false,
};

const reducer = (state: IReducer, action) => {
  const newState = { ...state };
  switch (action.type) {
    case ACTION.RESIZE:
      newState.dragWidth = action.width;
      return newState;
    case ACTION.DRAG_HOVER:
      newState.hoverDrag = action.hoverDrag;
      return newState;
    case ACTION.DRAG_ID:
      newState.cellDragId = action.cellDragId;
      return newState;
    case ACTION.MOUSEHOVER:
      newState.mousehover = action.value;
      return newState;
    default:
      throw new Error();
  }
};

export interface ICellHeaderData extends IStickTableRow {
  id: string;
  label: string;
  sortable: boolean;
  enableResize: boolean;
  enableMove: boolean;
  enableMultiSort: boolean;
  enableRemove: boolean;
  sort: ISort[];
  onClick: (s: ISort[]) => void;
  onMoveColumn: (dragColId: string, dropColId: string) => void;
  onRemove: (colId: string) => void;
  onResizing: (columnSize: number, columnIndex: number) => void;
  onResizeEnd: (columnSize: number, columnIndex: number) => void;
}
export interface ICellHeader extends IRenderer {
  data: ICellHeaderData;
}

const CellHeader = ({
  style,
  className,
  columnIndex,
  data: {
    id,
    label,
    sortable,
    enableResize,
    enableMove,
    enableMultiSort,
    enableRemove,
    sort,
    onClick,
    onMoveColumn,
    onRemove,
    onResizing,
    onResizeEnd,
  },
}: ICellHeader) => {
  const [state, dispatch] = React.useReducer(reducer, reducerInit);
  const { hoverDrag, cellDragId, dragWidth, mousehover } = state;

  const cellMoving = !!cellDragId || !!dragWidth;
  const classes = useStyles({
    height: style.height,
    zIndex: cellMoving ? 999 : 2,
    disabled: !enableMove,
  });

  const widthOld = style.width;
  const foundSort = getIndexSort(id, sort);
  const showSortOrderBadge = foundSort.sorted && sort.length > 1;
  const cbOnSortAsc = React.useCallback(() => {
    const ret = arrowSortAction(
      ISortOrder.ASC,
      id,
      label,
      sort,
      sortable,
      enableMultiSort,
    );
    if (ret !== undefined) {
      onClick(ret);
    }
  }, [enableMultiSort, id, label, onClick, sort, sortable]);
  const cbOnSortDesc = React.useCallback(() => {
    const ret = arrowSortAction(
      ISortOrder.DESC,
      id,
      label,
      sort,
      sortable,
      enableMultiSort,
    );
    if (ret !== undefined) {
      onClick(ret);
    }
  }, [enableMultiSort, id, label, onClick, sort, sortable]);
  const cbOnDragStart = React.useCallback(
    (event) => {
      dispatch({ type: ACTION.DRAG_ID, cellDragId: id });
      event.dataTransfer.setData(dragEventId, id);
    },
    [id],
  );
  const cbOnDragOver = React.useCallback((event) => {
    event.stopPropagation();
    event.preventDefault();
    dispatch({ type: ACTION.DRAG_HOVER, hoverDrag: true });
  }, []);
  const cbOnDragLeave = React.useCallback((event) => {
    event.stopPropagation();
    event.preventDefault();
    dispatch({ type: ACTION.DRAG_HOVER, hoverDrag: false });
  }, []);
  const cbOnDragEnd = React.useCallback((event) => {
    event.stopPropagation();
    event.preventDefault();
    dispatch({ type: ACTION.DRAG_ID, cellDragId: "" });
  }, []);
  const cbOnDrop = React.useCallback(
    (event) => {
      event.stopPropagation();
      event.preventDefault();
      const dragColId = event.dataTransfer.getData(dragEventId);
      const dropColId = id;
      if (dragColId !== dropColId) onMoveColumn(dragColId, dropColId);
      dispatch({ type: ACTION.DRAG_HOVER, hoverDrag: false });
    },
    [id, onMoveColumn],
  );
  const cbOnRemove = React.useCallback(() => {
    onRemove(id);
  }, [id, onRemove]);
  const cbOnClick = React.useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const dragWidthDebounced = useDebounce(dragWidth, 750);
  const onCellResizing = React.useCallback(
    (width: number) => {
      if (width !== widthOld) {
        onResizing(width, columnIndex);
        dispatch({ type: ACTION.RESIZE, width });
      }
    },
    [columnIndex, onResizing, widthOld],
  );
  const onMouseEnter = React.useCallback(() => {
    dispatch({ type: ACTION.MOUSEHOVER, value: true });
  }, []);
  const onMouseLeave = React.useCallback(() => {
    dispatch({ type: ACTION.MOUSEHOVER, value: false });
  }, []);

  React.useEffect(() => {
    if (!!dragWidthDebounced && !!dragWidth) {
      onResizeEnd(dragWidthDebounced, columnIndex);
      dispatch({ type: ACTION.RESIZE, width: 0 });
    }
  }, [columnIndex, dragWidthDebounced, onResizeEnd, dragWidth]);

  return (
    <div
      role="presentation"
      style={{ ...style, width: dragWidth || style.width }}
      className={classnames({
        [classes.cell]: true,
        [classes.cellDragging]: cellDragId === id,
        [classes.cellResizable]: enableResize,
        [className]: !!className,
      })}
      onFocus={emptyFn}
      draggable={enableMove}
      onDragStart={cbOnDragStart}
      onDragOver={cbOnDragOver}
      onDragLeave={cbOnDragLeave}
      onDragEnd={cbOnDragEnd}
      onDrop={cbOnDrop}
      onClick={cbOnClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {!hoverDrag ? null : <div className={classes.dropIndicator} />}
      {showSortOrderBadge ? (
        <Btn
          style={{ transition: "none" }}
          color={getTheme().colors.theme1}
          className={classes.btnSortCount}
          label={String(foundSort.index + 1)}
          small
          variant="bold"
        />
      ) : null}
      {cellMoving || !enableRemove ? null : (
        <Btn
          color={getTheme().colors.theme1}
          className={classes.btnRemove}
          tooltip="Remove Column"
          icon="close"
          onClick={cbOnRemove}
          small
        />
      )}

      <IconDrag open={mousehover && enableMove} />

      <IconSort
        selected={
          foundSort.sorted && sort[foundSort.index].order === ISortOrder.ASC
        }
        sort={ISortOrder.ASC}
        onClick={cbOnSortAsc}
        cellMousehover={mousehover}
        cellSortable={sortable}
        cellDragging={!!cellDragId}
      />
      <Text ellipsis className={classes.label} children={label} />
      <IconSort
        selected={
          foundSort.sorted && sort[foundSort.index].order === ISortOrder.DESC
        }
        sort={ISortOrder.DESC}
        onClick={cbOnSortDesc}
        cellMousehover={mousehover}
        cellSortable={sortable}
        cellDragging={!!cellDragId}
      />
      {cellDragId ? null : (
        <ReactResizeDetector
          handleWidth
          handleHeight={false}
          skipOnMount
          onResize={onCellResizing}
        />
      )}
    </div>
  );
};

export default CellHeader;
