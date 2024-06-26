import * as React from "react";
import classnames from "classnames";
import { VariableSizeGrid } from "react-window";
import { createUseStyles } from "react-jss";
import emptyFn from "../../../utils/emptyFn";
import ViewBlockRender, { IViewBlockRenderData } from "./ViewBlockRender";
import {
  cellHeightDefault,
  getKeyRender,
  getRowCount,
  prepareItems,
  IItemRender,
  IViewBlockItem,
  itemCountInRow,
} from "./utils";
import AutoSizer from "../../Autosizer";
import { getTheme } from "../../../theme";
import PopoverList, { IPopoverListItem } from "../../PopoverList";
import Placeholder from "../../Placeholder";
import BorderShadow from "../../BorderShadow";
import { reducer, reducerInitState, ACTIONS } from "./reducer";
import { IKeyDown } from "../../BtnBase";
import { PopoverOrigin } from "../../Popover";
import { getPositionZone } from "../../Popover/utils";
import last from "../../../utils/last";

const contextmenuOriginAnchor: PopoverOrigin = {
  horizontal: "center",
  vertical: "center",
};
const contextmenuOriginTransf: PopoverOrigin = {
  horizontal: "auto",
  vertical: "auto",
};
const useStyles = createUseStyles({
  view: {
    flex: 1,
    position: "relative",
    display: "flex",
    flexDirection: "row",
    height: "inherit",
    alignItems: "stretch",
    minHeight: 50,
  },
});

export interface IViewBlock {
  className?: string;
  style?: React.CSSProperties;
  color?: string;
  contextmenu?: IPopoverListItem[];
  itemWidth: number;
  itemHeight: (type: string) => number;
  itemRender: (p: IItemRender) => JSX.Element | React.ReactNode;
  itemHeader?: (
    type: string,
    index: number,
    count: number,
  ) => JSX.Element | React.ReactNode;
  itemFooter?: (
    type: string,
    index: number,
    count: number,
  ) => JSX.Element | React.ReactNode;
  needHeader?: {
    [type: string]: boolean;
  };
  needFooter?: {
    [type: string]: boolean;
  };
  items: IViewBlockItem[];
  itemsIdSelected?: string[];
  itemsTypeSort?: string[];
  onClick?: (event: React.MouseEvent) => void;
  onContextMenu?: (event: React.MouseEvent) => void;
  resetScrollbar?: number;
  loading?: boolean;
  placeholderIcon?: string;
  placeholderIconStyle?: React.CSSProperties;
  placeholderIconClassName?: string;
  placeholderLabel?: string;
  placeholderLabelStyle?: React.CSSProperties;
  placeholderLabelClassName?: string;
}

const ViewBlock = ({
  className,
  style,
  color = getTheme().colors.theme1,
  contextmenu = [],
  itemWidth,
  itemHeight,
  itemRender,
  itemHeader = emptyFn,
  itemFooter = emptyFn,
  needHeader,
  needFooter,
  items,
  itemsIdSelected = [],
  itemsTypeSort = [],
  onClick = emptyFn,
  onContextMenu = emptyFn,
  resetScrollbar,
  loading,
  placeholderIcon,
  placeholderIconStyle,
  placeholderIconClassName,
  placeholderLabel,
  placeholderLabelStyle,
  placeholderLabelClassName,
}: IViewBlock) => {
  const classes = useStyles({});
  const viewRef = React.useRef(null);
  const gridRef = React.useRef(null);
  const [state, dispatch] = React.useReducer(reducer, reducerInitState);
  const {
    keyRender,
    resizing,
    scrolled,
    columnCount,
    contextmenuOpen,
    contextmenuCoor,
  } = state;

  const itemsP = prepareItems({
    items,
    itemsTypeSort,
    needHeader,
    needFooter,
    columnCount,
  });
  const rowCount = getRowCount({
    itemsCount: itemsP.length,
    columnCount,
  });
  const resizeGrid = React.useCallback(
    ({ width }) => {
      if (!!gridRef?.current) {
        // resetto le row per ricalcolare le altezze
        gridRef.current.resetAfterRowIndex(0);
      }
      dispatch({
        type: ACTIONS.RESIZE,
        columnCount: itemCountInRow({
          listWidth: width,
          cellWidth: itemWidth,
        }),
      });
    },
    [itemWidth],
  );
  const rowHeight = React.useCallback(
    (rowIndex) => {
      try {
        const firstIndexInRowItems = columnCount * (rowIndex + 1) - columnCount;
        const { type }: IViewBlockItem = itemsP[firstIndexInRowItems];
        return itemHeight(type) || cellHeightDefault;
      } catch {
        return cellHeightDefault;
      }
    },
    [itemHeight, columnCount, itemsP],
  );
  const columnWidth = React.useCallback(() => itemWidth, [itemWidth]);
  const cbContextMenuClose = React.useCallback(() => {
    dispatch({ type: ACTIONS.CONTEXTMENU_CLOSE });
  }, []);
  const cbContextMenuView = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      if (!!contextmenu.length) {
        const { clientX, clientY } = event;
        dispatch({ type: ACTIONS.CONTEXTMENU_OPEN_VIEW, clientX, clientY });
      }
      onContextMenu(event);
    },
    [contextmenu, onContextMenu],
  );
  const cbContextMenuItem = React.useCallback(
    (
      event: React.MouseEvent<HTMLDivElement>,
      keyDown: IKeyDown,
      open: boolean,
    ) => {
      if (open) {
        const { clientX, clientY } = event;
        dispatch({ type: ACTIONS.CONTEXTMENU_OPEN_ITEM, clientX, clientY });
      }
    },
    [],
  );
  const cbClick = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      onClick(event);
    },
    [onClick],
  );
  const cbScroll = React.useCallback(({ scrollTop }) => {
    dispatch({ type: ACTIONS.SCROLL, scrollTop });
  }, []);
  const getViewRef = React.useCallback(
    (element) => {
      if (element && resizing) resizeGrid(element.getBoundingClientRect());
      viewRef.current = element;
    },
    [resizeGrid, resizing],
  );

  const anchorLeft = contextmenuCoor[0];
  const anchorTop = contextmenuCoor[1];
  const contextmenuPosizionZone = getPositionZone({
    innerWidth: viewRef?.current?.clientWidth || 0,
    innerHeight: viewRef?.current?.clientHeight || 0,
    anchorLeft,
    anchorTop,
  });
  const estimatedRowHeight: number = !items.length
    ? 50
    : itemHeight(last(items).type);

  // se resetScrollbar undefined, reset scroll automatico -> quando cambiano gli items
  React.useEffect(() => {
    const keyRenderNew = getKeyRender(itemsP);
    if (!!gridRef?.current && keyRenderNew !== keyRender) {
      gridRef.current.resetAfterRowIndex(0);
      if (resetScrollbar === undefined) {
        gridRef.current.scrollToItem({
          columnIndex: 0,
          rowIndex: 0,
        });
      }
      dispatch({ type: ACTIONS.KEYRENDER, value: keyRenderNew });
    }
  }, [itemsP, keyRender, resetScrollbar]);

  // se resetScrollbar valued, reset scroll programmato -> quando cambia resetScrollbar
  React.useEffect(() => {
    if (!!gridRef?.current && resetScrollbar) {
      gridRef.current.scrollToItem({
        columnIndex: 0,
        rowIndex: 0,
      });
      dispatch({ type: ACTIONS.SCROLL, value: false });
    }
  }, [resetScrollbar]);

  return (
    <>
      <div
        role="presentation"
        ref={getViewRef}
        className={classnames({
          [classes.view]: true,
          [className]: !!className,
        })}
        style={style}
        onContextMenu={cbContextMenuView}
        onClick={cbClick}
      >
        {!scrolled ? null : <BorderShadow position="top" shadow />}
        {loading || !items.length ? (
          <Placeholder
            spinnerColor={color}
            spinner={loading}
            icon={placeholderIcon}
            iconStyle={placeholderIconStyle}
            iconClassName={placeholderIconClassName}
            label={placeholderLabel}
            labelStyle={placeholderLabelStyle}
            labelClassName={placeholderLabelClassName}
          />
        ) : (
          <AutoSizer onResize={resizeGrid}>
            {({ width, height }) => {
              if (!width || !height) return null;
              const itemData: IViewBlockRenderData = {
                color,
                itemWidth,
                itemHeight,
                itemRender,
                itemHeader,
                itemFooter,
                itemsIdSelected,
                columnCount,
                items: itemsP,
                onContextMenu: cbContextMenuItem,
                contextmenuOriginAnchor,
                contextmenuOriginTransf,
                contextmenuPosizionZone,
              };
              return (
                <VariableSizeGrid
                  ref={gridRef}
                  itemData={itemData}
                  columnCount={columnCount}
                  columnWidth={columnWidth}
                  height={height}
                  rowCount={rowCount}
                  rowHeight={rowHeight}
                  width={width}
                  children={ViewBlockRender}
                  onScroll={cbScroll}
                  estimatedRowHeight={estimatedRowHeight}
                />
              );
            }}
          </AutoSizer>
        )}
      </div>
      <PopoverList
        open={contextmenuOpen}
        onClose={cbContextMenuClose}
        anchorReference="anchorPosition"
        anchorPosition={{ left: anchorLeft, top: anchorTop }}
        originAnchor={contextmenuOriginAnchor}
        originTransf={contextmenuOriginTransf}
        positionZone={contextmenuPosizionZone}
        actions={contextmenu}
      />
    </>
  );
};

export default ViewBlock;
