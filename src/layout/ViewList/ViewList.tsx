import * as React from "react";
import classnames from "classnames";
import { VariableSizeList } from "react-window";
import { createUseStyles } from "react-jss";
import emptyFn from "../../utils/emptyFn";
import ViewListRender, { IViewListRenderData } from "./ViewListRender";
import AutoSizer from "../../core/Autosizer";
import { getTheme } from "../../theme";
import PopoverList from "../../core/PopoverList";
import Placeholder from "../../core/Placeholder";
import {
  IViewListItem,
  getKeyRender,
  prepareItems,
  rowHeightDefault,
} from "./utils";
import ViewListToolbar, { toolbarHeight } from "./ViewListToolbar";
import { PopoverOrigin } from "../../core/Popover";
import { reducer, reducerInitState, ACTIONS } from "./reducer";
import { getPositionZone } from "../../core/Popover/utils";
import { IViewList } from "./interfaces";
import BorderShadow from "../../core/BorderShadow";
import { isMobile } from "../../utils/deviceUtils";

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

const ViewList = ({
  className,
  style,
  color = getTheme().colors.theme1,
  contextmenu = [],
  columns = [],
  columnsSortId,
  columnsSortOrder,
  itemHeight,
  itemRender,
  itemHeader = emptyFn,
  itemFooter = emptyFn,
  needHeader,
  needFooter,
  needToolbar = true,
  items,
  itemsSelectedId = [],
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
  const itemSize = React.useCallback(
    (index: number) => {
      try {
        const { type }: IViewListItem = itemsP[index];
        return itemHeight(type);
      } catch {
        return rowHeightDefault;
      }
    },
    [itemHeight, itemsP],
  );
  const itemsSlcIdSet = new Set(itemsSelectedId);
  const itemsSelectedType = items
    .filter((f) => itemsSlcIdSet.has(f.id))
    .map((f) => f.type);

  const cbContextMenuClose = React.useCallback(() => {
    dispatch({ type: ACTIONS.CONTEXTMENU_CLOSE });
  }, []);
  const cbContextMenuView = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (isMobile()) return;
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
    (event: React.MouseEvent<HTMLDivElement>, open: boolean) => {
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
      listRef.current.resetAfterIndex(0);
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
                itemsSelectedId,
                itemsSelectedType,
                itemHeight,
                itemWidth: width,
                itemRender,
                itemHeader,
                itemFooter,
                columns,
                columnsShow,
                onContextMenu: cbContextMenuItem,
                contextmenuOriginAnchor,
                contextmenuOriginTransf,
                contextmenuPosizionZone,
              };
              return (
                <>
                  {!needToolbar ? null : (
                    <ViewListToolbar
                      color={color}
                      columns={columns}
                      columnsShow={columnsShow}
                      width={width}
                      onColumnSort={onColumnSort}
                      columnsSortId={columnsSortId}
                      columnsSortOrder={columnsSortOrder}
                    />
                  )}
                  <BorderShadow
                    position="top"
                    shadow={scrolled}
                    border={needToolbar || scrolled}
                    style={{ top: needToolbar ? toolbarHeight : 0 }}
                  />
                  <VariableSizeList
                    ref={listRef}
                    style={{ overflowX: "hidden" }}
                    width={width}
                    height={height - (needToolbar ? toolbarHeight : 0)}
                    itemSize={itemSize}
                    itemCount={itemsP.length + 3} // fix mobile footer
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
