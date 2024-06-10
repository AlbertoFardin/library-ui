import * as React from "react";
import classnames from "classnames";
import { FixedSizeList } from "react-window";
import { createUseStyles } from "react-jss";
import emptyFn from "../../../utils/emptyFn";
import ViewListRender, {
  IViewListRenderData,
  listitemBorder,
} from "./ViewListRender";
import AutoSizer from "../../Autosizer";
import { getTheme } from "../../../theme";
import PopoverList, { IPopoverListItem } from "../../PopoverList";
import Placeholder from "../../Placeholder";
import {
  IItemRender,
  IViewListColumn,
  IViewListItem,
  getKeyRender,
  prepareItems,
} from "./utils";
import ViewListToolbar, { toolbarHeight } from "./ViewListToolbar";
import { ISortOrder } from "../../../interfaces";
import { PopoverOrigin } from "../../Popover";
import { IKeyDown } from "../../BtnBase";
import { reducer, reducerInitState, ACTIONS } from "./reducer";
import { getPositionZone } from "../../Popover/utils";

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
    flexDirection: "column",
    height: "100%",
    alignItems: "stretch",
    minHeight: 50,
  },
});

export interface IViewList {
  className?: string;
  style?: React.CSSProperties;
  color?: string;
  contextmenu?: IPopoverListItem[];
  columns: IViewListColumn[];
  columnsSortId?: string;
  columnsSortOrder?: ISortOrder;
  itemHeight: number;
  itemRender: (p: IItemRender) => JSX.Element;
  itemHeader?: (type: string) => JSX.Element | React.ReactNode;
  itemFooter?: (type: string) => JSX.Element | React.ReactNode;
  needHeader?: {
    [type: string]: boolean;
  };
  needFooter?: {
    [type: string]: boolean;
  };
  items: IViewListItem[];
  itemsIdSelected?: string[];
  itemsTypeSort?: string[];
  onColumnSort?: (id: string, order: ISortOrder) => void;
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
  padding?: number[];
}
const ViewList = ({
  className,
  style,
  color = getTheme().colors.theme1,
  contextmenu = [],
  columns,
  columnsSortId,
  columnsSortOrder,
  itemHeight,
  itemRender,
  itemHeader = emptyFn,
  itemFooter = emptyFn,
  needHeader,
  needFooter,
  items,
  itemsIdSelected = [],
  itemsTypeSort = [],
  onColumnSort,
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
  padding = [5, 5],
}: IViewList) => {
  const classes = useStyles({});
  const viewRef = React.useRef(null);
  const listRef = React.useRef(null);
  const [state, dispatch] = React.useReducer(reducer, reducerInitState);
  const {
    keyRender,
    resizing,
    scrolled,
    columnsShow,
    contextmenuOpen,
    contextmenuCoor,
  } = state;

  const itemsP = prepareItems({
    items,
    itemsTypeSort,
    needHeader,
    needFooter,
  });
  const onResize = React.useCallback(
    ({ height, width }) => {
      dispatch({ type: ACTIONS.RESIZE, height, width, columns });
    },
    [columns],
  );
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
  const cbScroll = React.useCallback(({ scrollOffset }) => {
    dispatch({ type: ACTIONS.SCROLL, value: !!scrollOffset });
  }, []);
  const anchorLeft = contextmenuCoor[0];
  const anchorTop = contextmenuCoor[1];
  const contextmenuPosizionZone = getPositionZone({
    innerWidth: viewRef?.current?.clientWidth || 0,
    innerHeight: viewRef?.current?.clientHeight || 0,
    anchorLeft,
    anchorTop,
  });

  // se resetScrollbar undefined, reset scroll automatico -> quando cambiano gli items
  React.useEffect(() => {
    const keyRenderNew = getKeyRender(items);
    if (!!listRef && !!listRef.current && keyRenderNew !== keyRender) {
      if (resetScrollbar === undefined) {
        listRef.current.scrollToItem(0);
      }
      dispatch({ type: ACTIONS.KEYRENDER, value: keyRenderNew });
    }
  }, [items, keyRender, resetScrollbar]);

  // se resetScrollbar valued, reset scroll programmato -> quando cambia resetScrollbar
  React.useEffect(() => {
    if (!!listRef && !!listRef.current && resetScrollbar) {
      listRef.current.scrollToItem(0);
      dispatch({ type: ACTIONS.SCROLL, value: false });
    }
  }, [resetScrollbar]);

  return (
    <>
      <div
        ref={viewRef}
        role="presentation"
        className={classnames({
          [classes.view]: true,
          [className]: !!className,
        })}
        style={style}
        onContextMenu={cbContextMenuView}
        onClick={cbClick}
      >
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
          <AutoSizer onResize={onResize}>
            {({ width, height }) => {
              if (resizing || !width || !height) null;
              const itemData: IViewListRenderData = {
                color,
                items: itemsP,
                itemsIdSelected,
                itemHeight,
                itemWidth: width,
                itemRender,
                itemHeader,
                itemFooter,
                columns,
                columnsShow,
                padding,
                onContextMenu: cbContextMenuItem,
                contextmenuOriginAnchor,
                contextmenuOriginTransf,
                contextmenuPosizionZone,
              };
              return (
                <>
                  <ViewListToolbar
                    color={color}
                    contextmenu={contextmenu}
                    columns={columns}
                    columnsShow={columnsShow}
                    padding={padding}
                    width={width}
                    onColumnSort={onColumnSort}
                    columnsSortId={columnsSortId}
                    columnsSortOrder={columnsSortOrder}
                    scrolled={scrolled}
                  />
                  <FixedSizeList
                    ref={listRef}
                    width={width}
                    height={height - toolbarHeight}
                    itemSize={itemHeight + listitemBorder * 2}
                    itemCount={itemsP.length}
                    itemData={itemData}
                    onScroll={cbScroll}
                    children={ViewListRender}
                  />
                </>
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

export default ViewList;
